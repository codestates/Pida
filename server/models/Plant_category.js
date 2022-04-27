'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Plant);
    }
  }
  Plant_category.init(
    {
      space: DataTypes.STRING(1),
      size: DataTypes.STRING(1),
      species: DataTypes.STRING(1),
    },
    {
      sequelize,
      modelName: 'Plant_category',
      timestamps: false,
    },
  );
  return Plant_category;
};
