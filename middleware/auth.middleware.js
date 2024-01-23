const jwt = require("jsonwebtoken");

// middlware pour l'admin seulement
exports.requireAuthAdmin = (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "") || "";
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action!Veillez contacter l'admin",
        });
      } else if (decodedToken.dataValues.role != "admin") {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action!Veillez contacter l'admin pour changer le role de votre compte",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({
      error: true,
      message: "Vous n'êtes pas authorisé à faire cette action",
    });
  }
};

// middlware pour l'admin ou role moderator
exports.requireAuthIngenieur = (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "") || "";
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      const role = decodedToken.dataValues.role;
      if (err) {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action! Créer un compte modérateur au moins",
        });
      } else if (role == "admin") {
        next();
      } else if (role != "ingenieur") {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action! Créer un compte modérateur au moins",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({
      error: true,
      message:
        "Vous n'êtes pas authorisé à faire cette action! Créer un compte modérateur au moins",
    });
  }
};
exports.requireAuthManager = (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "") || "";
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      const role = decodedToken.dataValues.role;
      if (err) {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action! Veillez créer votre compte",
        });
      } else if (role == "admin") {
        next();
      } else if (role != "manager") {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action! Veillez créer votre compte",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({
      error: true,
      message:
        "Vous n'êtes pas authorisé à faire cette action! Veillez créer votre compte",
    });
  }
};
exports.requireAuthCollaborator = (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer ", "") || "";
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      const role = decodedToken.dataValues.role;
      if (err) {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action! Veillez créer votre compte",
        });
      } else if (role == "admin") {
        next();
      } else if (role != "collaborator") {
        res.status(401).send({
          error: true,
          message:
            "Vous n'êtes pas authorisé à faire cette action! Veillez créer votre compte",
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({
      error: true,
      message:
        "Vous n'êtes pas authorisé à faire cette action! Veillez créer votre compte",
    });
  }
};
