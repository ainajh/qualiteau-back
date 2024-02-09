const db = require("../models");
const Pcd = db.pcd;
const { createJournal } = require("./journal.controller");
// Create and Save a new user
exports.create = async (req, res) => {
  const {
    name_pcd,
    name_show,
    coord,
    model_pcd,
    fabricant,
    date_install,
    transmission,
    status,
    proprietaire,
  } = req.body;
  const pcd_data = {
    name_pcd,
    name_show,
    coord,
    model_pcd,
    fabricant,
    date_install,
    transmission,
    status,
    proprietaire,
  };
  Pcd.create(pcd_data)
    .then(async (data) => {
      const { ...result } = data.dataValues;
      const user = res.locals.user;
      const trigg = {
        message: `${user.lastName} ${user.firstName} a ajouté un PCD : "${name_pcd}"`,
        type: "PCD",
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
          err?.errors[0]?.message || "Il y a une erreur lors de la création.",
      });
    });
};

// Retrieve all Pcd from the database.
exports.findAll = (req, res) => {
  Pcd.findAll()
    .then((data) => {
      res.status(200).send({
        error: false,
        message: "Liste de toutes les PCD",
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
exports.findAllActive = (req, res) => {
  Pcd.findAll({ where: { status: "active" } })
    .then((data) => {
      res.status(200).send({
        error: false,
        message: "Liste de toutes les PCD",
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

  Pcd.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          data,
        });
      } else {
        res.status(404).send({
          error: false,
          message: `PCD inconnue`,
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
    name_pcd,
    name_show,
    coord,
    model_pcd,
    fabricant,
    date_install,
    transmission,
    status,
    proprietaire,
  } = req.body;
  const pcd_data = {
    name_pcd,
    name_show,
    coord,
    model_pcd,
    fabricant,
    date_install,
    transmission,
    status,
    proprietaire,
  };
  Pcd.update(pcd_data, {
    where: { id: id },
  })
    .then(async (num) => {
      if (num == 1) {
        const user = res.locals.user;
        const trigg = {
          message: `${user.lastName} ${user.firstName} a modifié un PCD : "${name_pcd}"`,
          type: "PCD",
        };
        await createJournal(trigg);
        res.status(200).send({
          error: false,
          message: "Modification avec succès.",
          data: pcd_data,
        });
      } else {
        res.send({
          error: false,
          message: `PCD inconnue`,
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

  Pcd.destroy({
    where: { id: id },
  })
    .then(async (num) => {
      if (num == 1) {
        const user = res.locals.user;
        const trigg = {
          message: `${user.lastName} ${user.firstName} a supprimer un PCD`,
          type: "PCD",
        };
        await createJournal(trigg);
        res.status(200).send({
          error: false,
          message: "Suppression avec succès!",
        });
      } else {
        res.send({
          error: false,
          message: "PCD à supprimer inconnue",
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
  Pcd.destroy({
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
