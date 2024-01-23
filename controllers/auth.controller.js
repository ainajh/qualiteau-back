const utils = require("../utils");
const db = require("../models");
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const Users = db.users;

exports.login = async (req, res) => {
  const { login, password } = req.body;
  let data;
  await Users.findAll({ where: { login: { [Op.eq]: login } } }).then((resp) => {
    data = resp;
  });

  if (data.length) {
    if (
      data[0].role == "admin" ||
      data[0].role == "ingenieur" ||
      data[0].role == "collaborator" ||
      data[0].role === "manager"
    ) {
      const checkPass = await utils.decryptPasword(password, data[0].password);
      const token = utils.createToken(data[0]);
      if (checkPass) {
        const { password, status, ...result } = data[0].dataValues;
        if (status) {
          res.status(200).send({
            token,
            message: `Connection avec succès! Bonjour ${data[0].lastName} ${data[0].firstName}`,
            error: false,
            data: result,
          });
        } else {
          res.status(401).send({
            error: true,
            message:
              "Votre compte n'est pas encore activé ! Veillez contacter l'admin",
          });
        }
      } else {
        res.status(404).send({
          error: true,
          message: "Mot de passe incorrect",
        });
      }
    } else {
      res.status(404).send({
        error: true,
        message:
          "Vous n'avez pas l'authorisation de se connecter à l'application",
      });
    }
  } else {
    res.status(404).send({
      error: true,
      message: "Utilisateur inconnu",
    });
  }
};

exports.checkUser = (req, res) => {
  const token = req.headers?.authorization?.replace("Bearer ", "") || "";
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(401).send({ error: true, message: "Unauthorized" });
      } else {
        const { password, ...others } = decodedToken.dataValues;
        res.send({ error: false, data: others });
      }
    });
  } else {
    res.status(401).send({ error: true, message: "Unauthorized" });
  }
};
