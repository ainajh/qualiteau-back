module.exports = (app) => {
  const capteur = require("../controllers/capteur.controller");
  const authMiddleware = require("../middleware/auth.middleware");
  var router = require("express").Router();

  // crud pdc
  router.post("/", authMiddleware.requireAuthAdmin, capteur.create);
  router.get("/", authMiddleware.requireAuthAdmin, capteur.findAll);
  router.get("/:id", capteur.findOne);
  router.put("/:id", authMiddleware.requireAuthAdmin, capteur.update);
  router.delete("/:id", authMiddleware.requireAuthAdmin, capteur.delete);
  router.delete("/all", authMiddleware.requireAuthAdmin, capteur.deleteAll);

  app.use("/api/capteur", router);
};
