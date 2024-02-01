"use strict";
const { Model } = require("sequelize");
const Pcd = require("./pcd");
module.exports = (sequelize, DataTypes) => {
  class Capteur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Capteur.belongsTo(models.Pcd, { foreignKey: "pcd" });
      Capteur.hasOne(models.Pcd, { foreignKey: "pcd" });
    }
  }
  Capteur.init(
    {
      name_capt: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Nom de la capteur réquis",
          },
        },
      },
      type_mes: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Type de mesure réquis",
          },
        },
      },
      date_cal: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Date de calibration réquis",
          },
        },
      },
      durre_call: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Durréé de calibration réquis",
          },
        },
      },
      type_sem: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Type sématique réquis",
          },
        },
      },
      val_min: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Valeur min  réquis",
          },
        },
      },
      val_max: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Valeur max  réquis",
          },
        },
      },
      nb_dec: {
        type: DataTypes.FLOAT,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Nombre decimaux  réquis",
          },
        },
      },
      unit: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Unité réquis",
          },
        },
      },
      unit_show: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Unité réquis",
          },
        },
      },
      pcd: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Un capteur est réquis",
          },
        },
      },

      color: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            arg: true,
            msg: "Couleur requis",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Capteur",
    }
  );

  return Capteur;
};
