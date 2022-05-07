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
      this.belongsToMany(models.Size, { through: 'Plant_sizes' });
      this.belongsToMany(models.Space, { through: 'Plant_spaces' });
      this.belongsToMany(models.Specie, { through: 'Plant_species' });
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
      timestamps: false,
    },
  );
  return Plant;
};
