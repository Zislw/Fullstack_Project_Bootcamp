
const prod_model = require('../models/products')
const { login } = require('./usersBL')

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        prod_model.find({}, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        prod_model.findById(id, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
    })
}

const addProduct = (obj) => {
    return new Promise((resolve, reject) => {
        let p = new prod_model(obj)
        p.save().then(_ => {
            resolve("Created!")
        }).catch(err => {
            reject(err)
        })

    })
}

const updateProduct = (id, obj) => {
    return new Promise((resolve, reject) => {
    prod_model.findOneAndUpdate({id:id}, obj, (err, data) => {
        if (err)
            reject(err)
        else{
            resolve(data)
        }
    })
    // prod_model.updateOne({id:id}, {name:obj.name,price:obj.price,amount:obj.amount,description:obj.description}, (err, data) => {
    //     if (err)
    //         reject(err)
    //     else{
    //           console.log(data);
    //           resolve(data)
    //     }
          
    // })
})
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        prod_model.findOneAndDelete({id:id}, (err, data) => {
            if (err)
                reject(err)
            else
                resolve("the product was deleted")
        })
    })
}

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct }

