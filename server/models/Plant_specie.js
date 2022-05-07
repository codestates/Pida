'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant_specie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Plant, { foreignKey: 'plantId', targetKey: 'id' });
      this.belongsTo(models.Specie, {
        foreignKey: 'speciesId',
        targetKey: 'id',
      });
    }
  }
  Plant_specie.init(
    {
      plantId: DataTypes.INTEGER,
      speciesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Plant_specie',
      timestamps: false,
    },
  );
  return Plant_specie;
};
