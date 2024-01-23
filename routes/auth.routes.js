module.exports = (app) => {
  const auth = require("../controllers/auth.controller");

  var router = require("express").Router();

  // auth user
  router.post("/login", auth.login);
  router.post("/checkuser", auth.checkUser);

  app.use("/api/auth", router);
};
