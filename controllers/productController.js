const Product = require('../models/Product');

// GET all products
const getProducts = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    if (category) query.category = category;
    if (featured) query.isFeatured = true;
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Seed initial products
const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = [
      {
        name: 'Dry Shampoo',
        tagline: 'Glow with Flow',
        description: 'Refreshes and revives greasy hair instantly without drying it out. Adds volume, texture, and saves time between washes. Infused with Vitamin E and Kaolin for superior oil absorption and hair health.',
        ingredients: ['Vitamin E', 'Kaolin', 'Corn Starch', 'Fragrance', 'Marine Extracts'],
        benefits: ['Refreshes greasy hair', 'Adds volume & texture', 'Saves time between washes', 'Clean fresh scent', 'Non-drying formula'],
        weight: '100ml',
        category: 'Hair Care',
        image: '/images/product1.jpeg',
        images: ['/images/product1.jpeg', '/images/product1_description.jpeg', '/images/dryshampoo.jpeg'],
        badge: 'New Launch',
        isFeatured: true,
        rating: 4.9,
        reviews: 42,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+dry+shampoo',
      },
      {
        name: 'Intense Glowing Spa Salt',
        tagline: 'A remedy to cleanse and nourish your skin',
        description: 'Experience the power of the ocean with our Intense Glowing Spa Salt. Infused with Vitamin C, Olive Oil, and Hyaluronic Acid, this 200g spa salt deeply cleanses pores, exfoliates dead skin cells, and leaves your skin radiant and hydrated. Inspired by coastal rituals, it brings the luxury of a beach spa right to your home.',
        ingredients: ['Himalayan Pink Salt', 'Vitamin C', 'Olive Oil', 'Hyaluronic Acid', 'Orange Extract', 'Aloe Vera'],
        benefits: ['Deep cleansing & exfoliation', 'Brightens skin tone', 'Intense hydration', 'Reduces dark spots', 'Anti-aging properties'],
        weight: '200g',
        category: 'Spa & Bath',
        image: '/images/product2.jpeg',
        images: ['/images/product2.jpeg', '/images/product2_description.jpeg', '/images/salt.jpeg'],
        badge: 'New Launch',
        badge: 'Best Seller',
        isFeatured: true,
        rating: 4.8,
        reviews: 124,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+spa+salt',
      }
    ];
    await Product.insertMany(products);
    res.json({ success: true, message: 'REFRESHED_WITH_MULTIPLE_IMAGES' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, seedProducts };
