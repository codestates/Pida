'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Plant_category);
      this.belongsToMany(models.User, { through: 'Interiors' });
    }
  }
  Plant.init(
    {
      name: DataTypes.STRING(50),
      description: DataTypes.STRING(500),
      image: DataTypes.STRING(2083),
    },
    {
      sequelize,
      modelName: 'Plant',
    },
  );
  return Plant;
};
