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
  cart = (req, res) => {
    if (req.session.cart) {
      var cart = req.session.cart;
      var total = req.session.total;
      res.render('cart', { cart: cart, total: total });
    } else {
      res.render('cart', { cart: [], total: 0 });
    }
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
  rmvProducts = (req, res) => {
    var id = req.body.id;
    var cart = req.session.cart;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        cart.splice(cart.indexOf(i), 1);
      }
    }
    calculateTotal(cart, req);
   res.redirect('/cart')
  }
  editProductQuantity = (req, res) => {
    var id = req.body.id;
    var quantity = req.body.quantity;
    var increase_btn = req.body.increase_product_quantity;
    var decrease_btn = req.body.decrease_product_quantity;

    var cart = req.session.cart;
    if (increase_btn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {

          if (cart[i].quantity > 0) {
            cart[i].quantity = parseInt(cart[i].quantity) + 1;

          }
        }
      }
    }
    if (decrease_btn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          if (cart[i].quantity > 1) {
            cart[i].quantity = parseInt(cart[i].quantity) - 1;
          }
        }
      }
    }
    calculateTotal(cart, req)
    res.redirect('/cart')
  }
};
module.exports = new controllProduct