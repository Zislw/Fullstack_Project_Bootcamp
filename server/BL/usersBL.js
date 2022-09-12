const bcrypt = require('bcrypt')
const { createToken } = require('../middleware/auth')
const user_model = require('../models/users')
const role_bl = require('./rolesBL')



const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        user_model.find({}, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        user_model.findById(id, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10)
            .then(hashedPassword => {
                role_bl.getRoleByName("user")
                    .then(data => {
                        console.log("Aaaaaaaaaaaaaa");
                        console.log(data);
                        let u = new user_model(
                            { ...user, password: hashedPassword, role: data }
                        )
                        u.save().then(_ => {
                            createToken(u).then(token => {
                                resolve({ message: "Created!", u, token })
                            })
                        }).catch(err => {
                            reject(err)
                        })
                    }).catch(err => {
                        reject(err)
                    })
            }).catch(err => {
                reject(err)
            })
    })

}

const updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        user_model.findByIdAndUpdate(id, user, (err, data) => {
            if (err)
                reject(err)
            else
                resolve("Updated!")
        })
    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        user_model.findByIdAndDelete(id, (err, data) => {
            if (err)
                reject(err)
            else
                resolve('Deleted!')
        })
    })
}

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        user_model.findOne({ email: email })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        console.log(password+' '+user.password);
                        if (!passwordCheck) {
                            resolve({ massage: "Password doesn't found", error })
                        }
                        createToken(user).then(token => {
                            resolve({ massage: "Login Successful", token })
                        })
                    })
                    .catch(err => {
                        resolve({ massage: 'password does not match', err })
                    })
            })
            .catch(err => {
                resolve({ massage: "email not found", err })
            })
    })
}


module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, login }

