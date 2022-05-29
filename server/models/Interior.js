'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interior extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: 'Interior_likes',
        foreignKey: 'interiorId',
      });
      this.hasMany(models.Comment);
      this.belongsTo(models.Plant);
    }
  }
  Interior.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(2083),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      totalLikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Interior',
    },
  );
  return Interior;
};
