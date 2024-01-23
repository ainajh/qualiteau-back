"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Le nom est réquis",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Le prénom est réquis",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Email déjà existé",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Email invalide",
          },
        },
      },
      address: DataTypes.STRING,
      entreprise: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["collaborator", "manager", "ingenieur", "admin"]],
            msg: "Role doit être 'collaborator' ou 'manager' ou 'ingenieur' ou 'admin'",
          },
          notEmpty: {
            arg: true,
            msg: "Le rôle est réquis",
          },
        },
      },
      login: {
        type: DataTypes.STRING,
        unique: {
          arg: true,
          msg: "Login déjà existé",
        },
        validate: {
          notEmpty: {
            arg: true,
            msg: "Login est réquis",
          },
        },
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      modelName: "User",
    }
  );
  return User;
};
