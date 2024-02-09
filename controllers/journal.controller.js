const db = require("../models");
const Journal = db.journal;
// Create and Save a new user
module.exports.createJournal = async (data) => {
  Journal.create(data).catch((err) => {
    res.status(500).json({
      error: true,
      message:
        err?.errors[0].message || "Il y a une erreur lors de la création.",
    });
  });
};

// Retrieve all Pcd from the database.
exports.findAll = (req, res) => {
  Journal.findAll({
    order: [["createdAt", "DESC"]], // Sorting by 'createdAt' in descending order
  })
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
