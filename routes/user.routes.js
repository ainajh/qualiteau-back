module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const authMiddleware = require("../middleware/auth.middleware");
  var router = require("express").Router();

  // crud user
  router.post("/", authMiddleware.requireAuthAdmin, users.create);
  router.get("/", authMiddleware.requireAuthAdmin, users.findAll);
  router.get("/:id", users.findOne);
  router.put("/:id", authMiddleware.requireAuthAdmin, users.update);
  router.delete("/:id", authMiddleware.requireAuthAdmin, users.delete);
  router.delete("/all", authMiddleware.requireAuthAdmin, users.deleteAll);

  app.use("/api/users", router);
};
