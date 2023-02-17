const Product = require("../model/Product");
const cartProduct = require("../model/Cart");

function calculateTotal(cart, req) {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].price) {
      total = total + cart[i].price * cart[i].quantity;
    } else {
      total = total + cart[i].price * cart[i].quantity;
    }
  }
  req.session.total = total;
  return total;
}
function isProductInCart(cart, id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          if (cart[i].quantity > 0) {
            cart[i].quantity = parseInt(cart[i].quantity) + 1;
            cartProduct.updateOne(
              { productId: id },
              { $set: { quantity: cart[i].quantity } },
              (err, result) => {
                if (err) throw err;
              }
            );
          }
        }
      }
      return true;
      
    } 
  }
  return false;
}

const controllProduct = {
  indexPage: (req, res) => {
    Product.find({}, (err, result) => {
      if (err) throw err;
      res.render("index", { result: result });
    });
  },
  cart: (req, res) => {
    if (req.session.cart) {
      let cart = req.session.cart;
      let total = req.session.total;
      res.render("cart", { cart: cart, total: total });
    } else {
      res.render("cart", { cart: [], total: 0 });
    }
  },
  addtoCart: (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let image = req.body.image;
    let products = {
      id: id,
      name: name,
      price: price,
      quantity: quantity,
      image: image,
    };
    let cart = req.session.cart || [];
    if (!isProductInCart(cart, id)) {
      cart.push(products);
      req.session.cart = cart;
      calculateTotal(cart, req);
      cartProduct.create(
        {
          session: req.sessionID,
          productId: id,
          name: name,
          price: price,
          quantity: quantity,
          image: image,
        },
        (err, result) => {
          if (err) throw err;
        }
      );
    }
    res.redirect("/cart");
  },
  removeProducts: (req, res) => {
    let id = req.body.id;
    let cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        cart.splice(i, 1);
      }
    }
    req.session.cart = cart;
    calculateTotal(cart, req);
    cartProduct.deleteOne({ productId: id }, (err, result) => {
      if (err) throw err;
      console.log("Product removed from cartProduct database");
    });
    res.redirect("/cart");
  },
  editProductQuantity: (req, res) => {
    let id = req.body.id;
    let quantity = req.body.quantity;
    let increaseBtn = req.body.increaseProductQuantity;
    let decreaseBtn = req.body.decreaseProductQuantity;
    let cart = req.session.cart;
    if (increaseBtn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          if (cart[i].quantity > 0) {
            cart[i].quantity = parseInt(cart[i].quantity) + 1;
            cartProduct.updateOne(
              { productId: id },
              { $set: { quantity: cart[i].quantity } },
              (err, result) => {
                if (err) throw err;
              }
            );
          }
        }
      }
    }
    if (decreaseBtn) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          if (cart[i].quantity > 1) {
            cart[i].quantity = parseInt(cart[i].quantity) - 1;
            cartProduct.updateOne(
              { productId: id },
              { $set: { quantity: cart[i].quantity } },
              (err, result) => {
                if (err) throw err;
              }
            );
          }
        }
      }
    }
    calculateTotal(cart, req);
    res.redirect("/cart");
  },
};
module.exports = controllProduct;
