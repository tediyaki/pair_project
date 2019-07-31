'use strict';
const saltGenerate = require('../helper/saltGenerate')
const hashPass = require('../helper/passwordGenerate')


module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Sequelize.Op
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Transaction, {foreignKey: 'user_id'})
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email format is incorrect"
        },
        mustUnique: function(value) {
          return User.findOne({
            where: {
              email: value,
              id: {
                [Op.ne]: this.id
              }
            }
          })
            .then(mail => {
              if(mail) {
                throw new Error("This email is already in use")
              }
            })
            .catch(err => {throw err})
        }
      }
    },
    avatar: DataTypes.BLOB,
    active: DataTypes.BOOLEAN,
    secret: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        mustUnique: function(value) {
          return User.findOne({
            where: {
              username: value,
              id: {
                [Op.ne]: this.id
              }
            }
          })
            .then(mail => {
              if(mail) {
                throw new Error("Telat pilih username ini")
              }
            })
            .catch(err => {throw err})
        }
      }
    }
  }, {
    sequelize
  });

  User.addHook('beforeCreate', 'hashPass', (user, option) => {
    user.secret = saltGenerate(user.username)
    user.password = hashPass(user.password, user.secret)
    user.active = false
  })

  return User;
};