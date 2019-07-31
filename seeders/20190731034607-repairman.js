'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Repairmans', [{
      username: "johndoe",
      specialist: "window",
      cost: 20000,
      avatar: "img/ava/1.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "jokodarmin",
      specialist: "door",
      cost: 300000,
      avatar: "img/ava/3.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "selabrustanoit",
      specialist: "floor",
      cost: 120000,
      avatar: "img/ava/10.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "stark",
      specialist: "roof",
      cost: 50000,
      avatar: "img/ava/2.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "supaijo",
      specialist: "door",
      cost: 350000,
      avatar: "img/ava/4/png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "sugriwok",
      specialist: "floor",
      cost: 125000,
      avatar: "img/ava/5.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "mpokdarmi",
      specialist: "floor",
      cost: 110000,
      avatar: "img/ava/6.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Repairmans', null, {});
  }
};
