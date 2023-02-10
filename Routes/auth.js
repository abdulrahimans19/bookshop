const router =require('express').Router()
const User =require('../Model/User')

const bcrypt=require('bcrypt')

router.get('/login',(req,res)=>{
    return res.render('Login')
})
router.get('/register',(req,res)=>{
    return res.render('Register')
})

router.post('/register',async(req,res)=>{
    try {
        const salt =await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(req.body.password,salt)
        const newUSer=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPass,
        })
        const user= await newUSer.save();
        console.log(user);
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login',async (req,res)=>{
    try {
        const user =await User.findOne({email:req.body.email})
        !user && res.status(400).json("wrong credentials");
        
        const validated =await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(422).json('incorrect password')
        
        return res.render('Cart')

    } catch (err) {
        res.status(500).json(err);
        
    }
})
module.exports=router;