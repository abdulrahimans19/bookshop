const router = require("express").Router();
const controller = require("../controller/controller");
const controllProduct = require("../controller/product");

router.get("/register", controller.registerPage);
router.post("/register", controller.userRegister);
router.get("/", controller.loginPage);
router.post("/", controller.login);
router.get("/logout", controller.logoutPage);
router.get("/index", controllProduct.indexPage);
router.post("/addToCart", controllProduct.addtoCart);
router.get("/cart", controllProduct.cart);
router.post("/removeProducts", controllProduct.removeProducts);
router.post("/editProductQuantity", controllProduct.editProductQuantity);
module.exports = router;
