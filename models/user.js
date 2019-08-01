'use strict';
const saltGenerate = require('../helper/saltGenerate')
const hashPass = require('../helper/passwordGenerate')
const nodemailer = require('nodemailer')

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
        }
        // mustUnique: function(value) {
        //   return User.findOne({
        //     where: {
        //       email: value,
        //       id: {
        //         [Op.ne]: this.id
        //       }
        //     }
        //   })
        //     .then(mail => {
        //       if(mail) {
        //         throw new Error("This email is already in use")
        //       }
        //     })
        //     .catch(err => {throw err})
        // }
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

  User.addHook('afterCreate', 'giveEmail', (user, options) => {
    console.log(user.email)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: '666blac.kid666@gmail.com',
          pass: 'Hacker99'
      }
    });

    let mailOptions = {
      from: 'bria.hermann@ethereal.email', // sender address
      to: user.email, // list of receivers
      subject: 'Email verification ✔', // Subject line
      // text: 'Hello', // plain text body
      html: `<h2>Please click <a href="/user/${user.username}/verify">this link</a> to verify your email</h2> 
            `// html body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        console.log(err, "ada error")
      } else {
        console.log(info, "berhasil dikirim");
      }
    })
  })

  return User;
};