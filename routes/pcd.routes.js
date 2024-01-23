module.exports = (app) => {
  const pcds = require("../controllers/pcd.controller");
  const authMiddleware = require("../middleware/auth.middleware");
  var router = require("express").Router();

  // crud pdc
  router.post("/", authMiddleware.requireAuthAdmin, pcds.create);
  router.get("/", authMiddleware.requireAuthAdmin, pcds.findAll);
  router.get("/:id", pcds.findOne);
  router.put("/:id", authMiddleware.requireAuthAdmin, pcds.update);
  router.delete("/:id", authMiddleware.requireAuthAdmin, pcds.delete);
  router.delete("/all", authMiddleware.requireAuthAdmin, pcds.deleteAll);

  app.use("/api/pcd", router);
};
