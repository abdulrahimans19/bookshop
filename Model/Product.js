const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true
    },
    catogories:{
        type:Array
    },
    price:{
        type:String,
        requires:true
    }
},
{timestamps:true}
);

const collection=new mongoose.model('product',ProductSchema)
module.exports=collection