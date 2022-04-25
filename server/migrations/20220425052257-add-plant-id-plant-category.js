'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Plant_categories', 'plant_id', {
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
    await queryInterface.removeColumn('Plant_categories', 'plant_id');
  },
};
