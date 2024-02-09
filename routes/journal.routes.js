module.exports = (app) => {
  const journal = require("../controllers/journal.controller");
  const authMiddleware = require("../middleware/auth.middleware");
  var router = require("express").Router();

  // crud pdc
  router.get("/", authMiddleware.requireAuthAdmin, journal.findAll);

  app.use("/api/journal", router);
};
