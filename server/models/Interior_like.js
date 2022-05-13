'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interior_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Interior);
    }
  }
  Interior_like.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      interiorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Interior_like',
      timestamps: false,
    },
  );
  return Interior_like;
};
