const db = require("../models");
const ModelApp = db.model_app;
const { createJournal } = require("./journal.controller");
// Create and Save a new user
exports.create = async (req, res) => {
  const { name, mesure, sematique, type_val, val_min, val_max, nb_dec } =
    req.body;
  const mdapp_data = {
    name,
    mesure,
    sematique,
    type_val,
    val_min,
    val_max,
    nb_dec,
  };
  ModelApp.create(mdapp_data)
    .then(async (data) => {
      const { ...result } = data.dataValues;
      const user = res.locals.user;
      const trigg = {
        message: `${user.lastName} ${user.firstName} a ajouté une modèle d'appareil : "${name}"`,
        type: "model_app",
      };
      await createJournal(trigg);
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

// Retrieve all Pcd from the database.
exports.findAll = (req, res) => {
  ModelApp.findAll()
    .then((data) => {
      res.status(200).send({
        error: false,
        message: "Liste de toutes les models d'appareil",
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        message:
          err?.errors?.[0]?.message || "Il y a une erreur lors de la création.",
      });
    });
};

// // Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ModelApp.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          data,
        });
      } else {
        res.status(404).send({
          error: false,
          message: `Models d'appareil inconnue`,
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
  const { name, mesure, sematique, type_val, val_min, val_max, nb_dec } =
    req.body;
  const mdapp_data = {
    name,
    mesure,
    sematique,
    type_val,
    val_min,
    val_max,
    nb_dec,
  };
  ModelApp.update(mdapp_data, {
    where: { id: id },
  })
    .then(async (num) => {
      if (num == 1) {
        const user = res.locals.user;
        const trigg = {
          message: `${user.lastName} ${user.firstName} a modifié une modèle d'appareil : "${name}"`,
          type: "model_app",
        };
        await createJournal(trigg);
        res.status(200).send({
          error: false,
          message: "Modification avec succès.",
          data: mdapp_data,
        });
      } else {
        res.send({
          error: false,
          message: `Models d'appareil inconnue`,
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

  ModelApp.destroy({
    where: { id: id },
  })
    .then(async (num) => {
      const user = res.locals.user;
      const trigg = {
        message: `${user.lastName} ${user.firstName} a supprimé une modèle d'appareil`,
        type: "model_app",
      };
      await createJournal(trigg);
      if (num == 1) {
        res.status(200).send({
          error: false,
          message: "Suppression avec succès!",
        });
      } else {
        res.send({
          error: false,
          message: "Le model d'appareil à supprimer inconnue",
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
  ModelApp.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(200).send({
        error: false,
        message: `${nums} pcd sont supprimé avec succès!`,
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
