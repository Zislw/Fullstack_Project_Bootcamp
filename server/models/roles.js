const mongoose = require('mongoose')

const { Schema } = mongoose

let role = new Schema({
    name: { type: String,require:true }
})

let r=mongoose.model('roles',role)
module.exports=r

// module.exports={
//     Admin:'admin',
//     User:'user'
// }