const mongoose=require('mongoose')
mongoose.set('strictQuery',true);

mongoose.connect('mongodb+srv://books:books@cluster0.cpqnnqy.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('database connected')
})
.catch(()=>{
    console.log('error connecting database')
})

const Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

const collection=new mongoose.model('store',Schema)
module.exports=collection