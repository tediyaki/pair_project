'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkInsert('Transactions', [{
        user_id: 10,
        repairman_id: 12,
        item: 'door',
        completed: true,
        warranty: '2018-08-02 02:07:46',
        booked_at: '2018-08-23 02:07:46',
        repairman_ratting: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        user_id: 10,
        repairman_id: 8,
        item: 'roof',
        completed: true,
        warranty: '2019-08-05 02:07:46',
        booked_at: '2019-07-26 02:07:46',
        repairman_ratting: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        user_id: 10,
        repairman_id: 11,
        item: 'door',
        completed: true,
        warranty: '2018-08-02 02:07:46',
        booked_at: '2018-08-23 02:07:46',
        repairman_ratting: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        user_id: 10,
        repairman_id: 9,
        item: 'floor',
        completed: true,
        warranty: '2019-01-02 02:07:46',
        booked_at: '2019-01-23 02:07:46',
        repairman_ratting: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete('Transactions', null, {});
  }
};
