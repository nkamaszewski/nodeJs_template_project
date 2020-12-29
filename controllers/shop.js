const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All products',
        path: '/products',
      }); // cause path is /view setted in app.js
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        pageTitle: product[0].title,
        path: '/products',
        product: product[0],
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
      }); // cause path is /view setted in app.js
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your cart',
        path: '/cart',
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your orders',
    path: '/orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
