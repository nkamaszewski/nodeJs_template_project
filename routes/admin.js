const path = require('path');
const experss = require('express');

const productsController = require('../controllers/products');

const router = experss.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;
