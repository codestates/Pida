'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plant_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      space: {
        allowNull: false,
        type: Sequelize.STRING(1),
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING(1),
      },
      species: {
        allowNull: false,
        type: Sequelize.STRING(1),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plant_categories');
  },
};
