'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Repairmans', 'avatar');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Repairmans', 'avatar', Sequelize.BLOB);
  }
};