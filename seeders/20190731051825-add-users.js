'use strict';
const hashPass = require('../helper/passwordGenerate')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkInsert('Users', [{
        name: 'John Doe',
        username: 'johD',
        address: 'monas',
        email: 'johnD@mail.com',
        active: false,
        photo: "img/ava/2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        secret: 'abcd',
        password: hashPass('john123', 'abcd')
      }, {
        name: 'Jerry Deda',
        username: 'jerda1',
        address: 'thamrin',
        email: 'jerda@mail.com',
        active: false,
        photo: "img/ava/1.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        secret: 'abcd',
        password: hashPass('jerry123', 'abcd')
      }, {
        name: 'Mandy Bill',
        username: 'manbill12',
        address: 'bandung',
        email: 'mandy-bill@mail.com',
        active: false,
        photo: "img/ava/4.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        secret: 'abcd',
        password: hashPass('mandy123', 'abcd')
      },{
        name: 'Rita Fitz',
        username: 'rifitz12',
        address: 'jalan merdeka',
        email: 'ritefr@mail.com',
        active: false,
        photo: "img/ava/5.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        secret: 'abcd',
        password: hashPass('rita123', 'abcd')
      },{
        name: 'Peter Griffin',
        username: 'PGriff',
        address: 'family street',
        email: 'peter@mail.com',
        active: false,
        photo: "img/ava/10.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        secret: 'abcd',
        password: hashPass('peter123', 'abcd')
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete('Users', null, {});
    
  }
};