'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Plant, {
        through: 'Plant_species',
        foreignKey: 'speciesId',
      });
    }
  }
  Specie.init(
    {},
    {
      sequelize,
      modelName: 'Specie',
      timestamps: false,
    },
  );
  return Specie;
};
