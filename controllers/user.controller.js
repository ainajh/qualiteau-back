const db = require("../models");
const utils = require("../utils");
const Users = db.users;

const { Op } = require("sequelize");

// Create and Save a new user
exports.create = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    status,
    address,
    role,
    login,
    password,
    entreprise,
  } = req.body;
  const password_hash = await utils.hashPasword(password);
  const user_data = {
    login,
    password: password_hash,
    firstName,
    lastName,
    email,
    address,
    status,
    role,
    entreprise,
  };
  Users.create(user_data)
    .then((data) => {
      const { password, ...result } = data.dataValues;
      res.status(201).json({
        error: false,
        message: "Création avec succès",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        message:
          err?.errors[0].message || "Il y a une erreur lors de la création.",
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const role = req.query.role;
  var condition = role ? { role: { [Op.like]: `%${role}%` } } : null;
  Users.findAll({ where: condition, attributes: { exclude: ["password"] } })
    .then((data) => {
      res.status(200).send({
        error: false,
        message: "Liste de toutes les utilisateurs",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || "Il y a une erreur lors de la requete",
      });
    });
};

// // Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          data,
        });
      } else {
        res.status(404).send({
          error: false,
          message: `Utilisateur inconnue`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || "Il y a une erreur lors de la requete",
      });
    });
};
// Update an user by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    email,
    status,
    address,
    role,
    login,
    entreprise,
  } = req.body;
  // const password_hash = await utils.hashPasword(password);
  const user_data = {
    firstName,
    lastName,
    email,
    status,
    address,
    role,
    login,
    entreprise,
  };
  Users.update(user_data, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          error: false,
          message: "Modification avec succès.",
        });
      } else {
        res.send({
          error: false,
          message: `Personne inconnue`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err?.errors[0].message || "Il y a une erreur lors de la requete",
      });
    });
};

// Delete an user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          error: false,
          message: "Suppression avec succès!",
        });
      } else {
        res.send({
          error: false,
          message: "Utilisateur à supprimer inconnue",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || "Il y a une erreur lors de la requete",
      });
    });
};

// Delete all user from the database.
exports.deleteAll = (req, res) => {
  const type = req.query.type;
  if (type != "all")
    return res.status(200).send({
      error: false,
      message: `Attention à votre requete`,
    });
  Users.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(200).send({
        error: false,
        message: `${nums} user were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
