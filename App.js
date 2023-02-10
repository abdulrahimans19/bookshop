const express=require('express')
const authRoute=require('./Routes/auth')
const ejs=require('ejs')
const path=require('path')
const app=express()

app.use(express.json())
app.use(express.static('views'))
app.set("view engine","ejs")
app.set('views',path.join(__dirname,('./views')));
app.use(express.urlencoded({extended:true}))
app.use('/',authRoute)

app.listen(5000,()=>{
    console.log('server started')
})