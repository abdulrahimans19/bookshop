const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const path = require("path");
const authRoute = require("./routes/auth");
const mongoose = require("./model/database");
const collections = require("./model/user");
const collection = require("./model/product");
const cartProducts = require("./model/cart");

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.static("views"));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "./views"));
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoute);

app.listen(5000, () => {
  console.log("server started");
});
