'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Plant_categories', 'plantId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Plants',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Plant_categories', 'plantId');
  },
};
