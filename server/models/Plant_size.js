'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant_size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Plant, { foreignKey: 'plantId', targetKey: 'id' });
      this.belongsTo(models.Size, { foreignKey: 'sizeId', targetKey: 'id' });
    }
  }
  Plant_size.init(
    {
      plantId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Plant_size',
      timestamps: false,
    },
  );
  return Plant_size;
};
