"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pcd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Pcd.hasOne(models.Capteur, { foreignKey: "pcd" });
      Pcd.belongsTo(models.Capteur, { foreignKey: "pcd" });
    }
  }
  Pcd.init(
    {
      name_pcd: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Nom de la PCD réquis",
          },
        },
      },
      name_show: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Nom affiché réquis",
          },
        },
      },
      coord: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Coordonnées réquis",
          },
        },
      },
      model_pcd: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Modèle datalogger réquis",
          },
        },
      },
      fabricant: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Le Fabricant réquis",
          },
        },
      },
      date_install: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            arg: true,
            msg: "La date d’installation est réquise",
          },
        },
      },
      transmission: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Le mode de transmission est réquis",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["active", "desactive"]],
            msg: "Role doit être 'active' ou 'desactive'",
          },
          notEmpty: {
            arg: true,
            msg: "Le rôle est réquis",
          },
        },
      },
      proprietaire: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Propriétaire est requis",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Pcd",
    }
  );
  return Pcd;
};
