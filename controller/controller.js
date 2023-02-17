const User = require("../model/user");
const bcrypt = require("bcrypt");

const controller = {
  registerPage: (req, res) => {
    if (req.session.user) res.redirect("/index");
    res.render("register");
  },
  loginPage: (req, res) => {
    if (req.session.user) {
      res.redirect("/index");
    } else {
      res.render("login");
    }
  },
  logoutPage: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  },
  userRegister: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
      });
      const user = await newUser.save();
      res.render("login");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(400).json("wrong credentials");
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(422).json("incorrect password");
      req.session.user = user;
      res.redirect("/index");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = controller;
