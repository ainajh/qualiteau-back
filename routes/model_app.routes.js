module.exports = (app) => {
  const model_app = require("../controllers/model_app.controller");
  const authMiddleware = require("../middleware/auth.middleware");
  var router = require("express").Router();

  // crud pdc
  router.post("/", authMiddleware.requireAuthAdmin, model_app.create);
  router.get("/", authMiddleware.requireAuthAdmin, model_app.findAll);
  router.get("/:id", model_app.findOne);
  router.put("/:id", authMiddleware.requireAuthAdmin, model_app.update);
  router.delete("/:id", authMiddleware.requireAuthAdmin, model_app.delete);
  router.delete("/all", authMiddleware.requireAuthAdmin, model_app.deleteAll);

  app.use("/api/model_app", router);
};
