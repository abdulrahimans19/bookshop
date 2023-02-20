const Product = require("../model/Product");
const cartProduct = require("../model/Cart");

calculateTotal = (cart, req) => {
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
};
isProductInCart = (cart, id) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      return true;
    }
  }
  return false;
};
const controllProduct = {
  indexPage: async (req, res) => {
    try {
      const products = await Product.find({});
      res.render("index", { result: products });
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).send("Server error");
    }
  },
  cart: async (req, res) => {
    try {
      const userId = req.session.user;
      const savedCarts = await cartProduct.find({ userID: userId });
      const cart = req.session.cart || [];
      const total = calculateTotal(cart, req);
      res.render("cart", { usercart: savedCarts, cart: cart, total: total });
    } catch (error) {
      console.error("Error getting carts:", error);
      res.status(500).send("Server error");
    }
  },
  addtoCart: async (req, res) => {
    try {
      const userId = req.session.user;
      const productId = req.body.id;
      const name = req.body.name;
      const price = req.body.price;
      const quantity = req.body.quantity;
      const image = req.body.image;
      const cart = req.session.cart || [];
      let product = cart.find((product) => product.id === productId);
      if (product) {
        product.quantity++;
        await cartProduct.updateOne(
          { userID: userId, productId: productId },
          { $set: { quantity: product.quantity } }
        );
      } else {
        product = {
          userID: userId,
          id: productId,
          name: name,
          price: price,
          quantity: quantity,
          image: image,
        };
        cart.push(product);
        await cartProduct.create({
          userID: userId,
          session: req.sessionID,
          productId: productId,
          name: name,
          price: price,
          quantity: quantity,
          image: image,
        });
      }
      req.session.cart = cart;
      calculateTotal(cart, req);
      res.redirect("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).send("Server error");
    }
  },
  removeProducts: async (req, res) => {
    try {
      const productId = req.body.id;
      const cart = req.session.cart;
      const filteredCart = cart.filter((product) => product.id !== productId);
      req.session.cart = filteredCart;
      await cartProduct.deleteOne({
        userID: req.session.user,
        productId: productId,
      });
      calculateTotal(filteredCart, req);
      res.redirect("/cart");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).send("Server error");
    }
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
              { userID: req.session.user, id: id },
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
              { userID: req.session.user, id: id },
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
