const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const saltRounds = 10;
exports.hashPasword = async (password) => {
  let pass = await bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .catch((err) => console.error(err.message));
  return pass;
};

exports.decryptPasword = async (password, password_now) => {
  return await bcrypt.compare(password, password_now);
};

exports.createToken = (data) => {
  return jwt.sign({ ...data }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

exports.formatDate = (date) => {
  const originalDate = new Date(date);
  const formattedDate = originalDate.toISOString().split("T")[0];
  return formattedDate;
};
