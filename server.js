const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config({ path: "config/.env" });
const app = express();

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to qualiteau application." });
});

require("./routes/user.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/pcd.routes")(app);
require("./routes/capteur.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
