'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Plant, { through: 'Interiors' });
      this.hasMany(models.Comment);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(70),
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      platformType: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      emailAuthCode: {
        type: DataTypes.STRING(6),
        allowNull: true,
      },
      emailVerified: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
