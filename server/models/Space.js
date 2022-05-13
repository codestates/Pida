'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Plant, { through: 'Plant_spaces' });
    }
  }
  Space.init(
    {},
    {
      sequelize,
      modelName: 'Space',
      timestamps: false,
    },
  );
  return Space;
};
