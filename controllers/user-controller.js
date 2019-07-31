const Model = require('../models')

class UserController {
    static addUser(req, res) {
        Model.User.create(req.body) 
            .then()
            .catch()
    }

    static updateUser(req, res) {
        Model.User.update()
    }

    static readTransaction(req, res) {
        Model.Transaction.findAll({
            where: {
                id: req.params.id,
                include: {
                    
                }
            }
        })
    }
}

module.exports = UserController