const Product = require("../Model/Product");

function isProductInCart(cart, id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      return true;
    }
  }
  return false
}

function calculateTotal(cart, req) {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].price) {
      total = total + (cart[i].price * cart[i].quantity)
    } else {
      total = total + (cart[i].price * cart[i].quantity)
    }
  }
  req.session.total = total;
  return total;
}

class controllProduct {
  indexPage = (req, res) => {
    Product.find({}, (err, result) => {
      if (err) throw err;
      res.render("index", { result: result })
    })
  }
  addtoCart = (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let image = req.body.image;
    let products = { id: id, name: name, price: price, quantity: quantity, image: image };

    if (req.session.cart) {
      var cart = req.session.cart;

      if (!isProductInCart(cart, id)) {
        cart.push(products)
      }
    } else {
      req.session.cart = [products]
      var cart = req.session.cart
    }

    calculateTotal(cart, req);

    res.redirect('/cart')
  }
  cart = (req, res) => {
    var cart = req.session.cart;
    var total = req.session.total;
    res.render('cart', { cart: cart, total: total })
  }
};
module.exports = new controllProduct
