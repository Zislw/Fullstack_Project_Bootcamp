const mongoose=require('mongoose')

const {Schema}=mongoose

const prod=new Schema({
    id:{type:Number,require:true},
    name:{type:String,require:true},
    price:{type:Number,require:true},
    amount:{type:Number,require:true},
    description:{type:String,require:true},
    image:{type:String}
})

const prods=mongoose.model('products',prod)
module.exports=prods