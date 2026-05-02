const express = require('express');
const router = express.Router();
const { getProducts, getProduct, createProduct, seedProducts } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/seed', seedProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);

module.exports = router;
