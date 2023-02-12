const User = require('../Model/User')
const bcrypt = require('bcrypt')

class controller {
    registerPage = (req, res) => {
        if (req.session.user)
            res.redirect('/index')
        res.render('Register');

    }
    loginPage = (req, res) => {
        if (req.session.user) {
            res.redirect('/index');
        } else {

            res.render('Login')
        }
    }
    deletepage = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
    }
    userRegister = async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt)
            const newUSer = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPass,
            })
            const user = await newUSer.save();
            res.render('Login')
        } catch (err) {
            res.status(500).json(err)
        }
    }

    login = async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })

            !user && res.status(400).json("wrong credentials");

            const validated = await bcrypt.compare(req.body.password, user.password)
            !validated && res.status(422).json('incorrect password')
            req.session.user = user
            res.redirect('/index')
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new controller