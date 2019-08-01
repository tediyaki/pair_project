'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Repairmans', 'photo', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Repairmans', 'photo', Sequelize.STRING);
  }
};