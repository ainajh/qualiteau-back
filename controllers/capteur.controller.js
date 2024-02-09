const db = require("../models");
const Capteur = db.capteur;
const Pcd = db.pcd;
const { createJournal } = require("./journal.controller");

// Create and Save a new user
exports.create = async (req, res) => {
  const {
    name_capt,
    type_mes,
    date_cal,
    durre_call,
    type_sem,
    val_min,
    val_max,
    nb_dec,
    unit,
    color,
    unit_show,
    pcd,
  } = req.body;
  const capteur_data = {
    name_capt,
    type_mes,
    date_cal,
    durre_call,
    type_sem,
    val_min,
    val_max,
    nb_dec,
    unit,
    color,
    unit_show,
    pcd,
  };
  Capteur.create(capteur_data)
    .then(async (data) => {
      const { ...result } = data.dataValues;
      const user = res.locals.user;
      const trigg = {
        message: `${user.lastName} ${user.firstName} a ajouté un capteur: "${name_capt}"`,
        type: "capteur",
      };
      await createJournal(trigg);
      res.status(201).json({
        error: false,
        message: "Création avec succès",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        message:
          err?.errors[0]?.message || "Il y a une erreur lors de la création.",
      });
    });
};

// Retrieve all capteur from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await db.sequelize.query(`
    SELECT Capteurs.*, Pcds.name_pcd AS "pcd_name"
    FROM Capteurs
    INNER JOIN Pcds ON Pcds.id = Capteurs.pcd;
    `);

    res.status(200).send({
      error: false,
      message: "Liste de toutes les capteur",
      data: data[0],
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({
      error: true,
      message: error.message || "Il y a une erreur lors de la requete",
    });
  }
};

exports.findAllActive = (req, res) => {
  Capteur.findAll({ where: { status: "active" } })
    .then((data) => {
      res.status(200).send({
        error: false,
        message: "Liste de toutes les capteurs",
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

  Capteur.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          data,
        });
      } else {
        res.status(404).send({
          error: false,
          message: `capteur inconnue`,
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
    name_capt,
    type_mes,
    date_cal,
    durre_call,
    type_sem,
    val_min,
    val_max,
    nb_dec,
    unit,
    color,
    unit_show,
    pcd,
  } = req.body;
  const capteur_data = {
    name_capt,
    type_mes,
    date_cal,
    durre_call,
    type_sem,
    val_min,
    val_max,
    nb_dec,
    unit,
    color,
    unit_show,
    pcd,
  };
  Capteur.update(capteur_data, {
    where: { id: id },
  })
    .then(async (num) => {
      if (num == 1) {
        const user = res.locals.user;
        const trigg = {
          message: `${user.lastName} ${user.firstName} a modifié un capteur: "${name_capt}"`,
          type: "capteur",
        };
        await createJournal(trigg);
        res.status(200).send({
          error: false,
          message: "Modification avec succès.",
          data: capteur_data,
        });
      } else {
        res.send({
          error: false,
          message: `capteur inconnue`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err?.errors[0]?.message || "Il y a une erreur lors de la requete",
      });
    });
};

// Delete an user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Capteur.destroy({
    where: { id: id },
  })
    .then(async (num) => {
      if (num == 1) {
        const user = res.locals.user;
        const trigg = {
          message: `${user.lastName} ${user.firstName} a supprimé un capteur`,
          type: "capteur",
        };
        await createJournal(trigg);
        res.status(200).send({
          error: false,
          message: "Suppression avec succès!",
        });
      } else {
        res.send({
          error: false,
          message: "capteur à supprimer inconnue",
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
  Capteur.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(200).send({
        error: false,
        message: `${nums} capteur sont supprimé avec succès!`,
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
