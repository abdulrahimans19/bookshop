const router = require('express').Router()
const controller = require('../Controller/controller')
const controllProduct=require('../Controller/product')

router.get('/register', controller.registerPage)
router.get('/', controller.loginPage)
router.get('/logout', controller.deletepage)
router.post('/register', controller.userRegister)
router.post('/', controller.login)
router.get('/index',controllProduct.indexPage)
router.post('/add_to_cart',controllProduct.addtoCart)
router.get('/cart',controllProduct.cart)
module.exports = router;