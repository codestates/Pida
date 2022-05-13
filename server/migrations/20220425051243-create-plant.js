'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(2083),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plants');
  },
};
