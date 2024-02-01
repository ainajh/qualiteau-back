"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModelApp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ModelApp.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Nom du capteur réquis",
          },
        },
      },
      mesure: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Type de mesure réquis",
          },
        },
      },
      sematique: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Type sémantique réquis",
          },
        },
      },
      type_val: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Type du valeur réquis",
          },
        },
      },
      val_min: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Valeur min réquis",
          },
        },
      },
      val_max: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Valeur max réquis",
          },
        },
      },
      nb_dec: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Nombre de décimaux réquis",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "ModelApp",
    }
  );
  return ModelApp;
};
