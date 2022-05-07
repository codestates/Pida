'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant_space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Plant, { foreignKey: 'plantId', targetKey: 'id' });
      this.belongsTo(models.Space, { foreignKey: 'spaceId', targetKey: 'id' });
    }
  }
  Plant_space.init(
    {
      plantId: DataTypes.INTEGER,
      spaceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Plant_space',
      timestamps: false,
    },
  );
  return Plant_space;
};
