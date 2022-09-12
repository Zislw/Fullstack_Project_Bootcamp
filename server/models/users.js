const mongoose=require('mongoose')
const roles=require('./roles')

let user=new mongoose.Schema({
    name:{type:String,require:true},
    password:{type:String,require:true},
    email:{type:String,require:true},
    address:{type:String},
    role:{type:[mongoose.Schema.Types.ObjectId],ref:"roles"}
    // ,role:{type:String,default:roles.User}
})

let newUser=mongoose.model('users',user)

module.exports=newUser
