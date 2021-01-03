const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } })
//     .then((products) => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const { productId, title, price, imageUrl, description } = req.body;
//   Product.findByPk(productId)
//     .then((product) => {
//       product.title = title;
//       product.price = price;
//       product.imageUrl = imageUrl;
//       product.description = description;
//       return product.save();
//     })
//     .then((result) => {
//       res.redirect('/admin/products');
//     })
//     .catch((err) => console.log(err));
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin products',
//         path: '/admin/products',
//       }); // cause path is /view setted in app.js
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const { productId } = req.body;
//   Product.findByPk(productId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       res.redirect('/admin/products');
//     })
//     .catch((err) => console.log(err));
// };
