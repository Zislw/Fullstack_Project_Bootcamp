const role_model = require('../models/roles')

const getRoleByName = (roleName) => {
    return new Promise((resolve, reject) => {
        if (typeof roleName == "string")
            roleName = [roleName]
        role_model.find({ name: { $in: roleName } }, { _id: 1 }, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data.map(item=>item._id))
            }

        })


    })
}

module.exports = { getRoleByName }