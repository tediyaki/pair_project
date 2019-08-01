'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Repairmans', [{
      username: "johndoe",
      specialist: "window",
      cost: 20000,
      photo: "img/ava/1.png",
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "jokodarmin",
      specialist: "door",
      cost: 300000,
      photo: "img/ava/3.png",
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "selabrustanoit",
      specialist: "floor",
      cost: 120000,
      photo: "img/ava/10.png",
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "stark",
      specialist: "roof",
      cost: 50000,
      photo: "img/ava/2.png",
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "supaijo",
      specialist: "door",
      cost: 350000,
      photo: "img/ava/4/png",
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "sugriwok",
      specialist: "floor",
      cost: 125000,
      photo: "img/ava/5.png",
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "mpokdarmi",
      specialist: "floor",
      cost: 110000,
      photo: "img/ava/6.png",
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Repairmans', null, {});
  }
};
