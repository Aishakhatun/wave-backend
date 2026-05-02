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
        price: 499,
        category: 'Hair Care',
        image: '/images/dry-shampoo.jpg',
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
        price: 999,
        category: 'Spa & Bath',
        image: '/images/spa-salt.jpg',
        badge: 'Best Seller',
        isFeatured: true,
        rating: 4.8,
        reviews: 124,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+spa+salt',
      },
      {
        name: 'Radiance Vitamin C Serum',
        tagline: 'Brighten, tighten, and glow every day',
        description: 'Our science-backed Vitamin C Serum is formulated with 20% stabilized Vitamin C and Niacinamide to deliver powerful brightening results. Lightweight and fast-absorbing, this serum fades hyperpigmentation, evens skin tone, and boosts collagen production for firmer, younger-looking skin.',
        ingredients: ['20% Vitamin C (Ascorbic Acid)', 'Niacinamide', 'Hyaluronic Acid', 'Ferulic Acid', 'Vitamin E'],
        benefits: ['Fades dark spots', 'Boosts collagen', 'Even skin tone', 'Antioxidant protection', 'Firms skin'],
        weight: '30ml',
        price: 1499,
        category: 'Serums',
        image: '/images/vitamin-c-serum.jpg',
        badge: 'Trending',
        isFeatured: true,
        rating: 4.9,
        reviews: 89,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+vitamin+c+serum',
      },
      {
        name: 'Ocean Glow Face Wash',
        tagline: 'Dive into deep cleansing freshness',
        description: 'Formulated with marine extracts and salicylic acid, the Ocean Glow Face Wash removes excess oil, unclogs pores, and leaves your skin feeling refreshed and glowing. Suitable for all skin types, this gentle yet effective cleanser is your daily ritual for clear, luminous skin.',
        ingredients: ['Marine Collagen', 'Salicylic Acid', 'Neem Extract', 'Green Tea', 'Aloe Vera'],
        benefits: ['Removes excess oil', 'Unclogs pores', 'Prevents acne', 'Refreshing sensation', 'Suitable for all skin types'],
        weight: '100ml',
        price: 599,
        category: 'Face Care',
        image: '/images/face-wash.jpg',
        badge: 'Fan Favourite',
        isFeatured: true,
        rating: 4.7,
        reviews: 203,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+face+wash',
      },
      {
        name: 'Wave Moisturizing Body Lotion',
        tagline: 'Silky smooth skin from head to toe',
        description: 'Luxuriously rich yet lightweight, our Wave Body Lotion is infused with shea butter, coconut oil, and ceramides to deeply moisturize and repair skin barriers. It absorbs quickly without a greasy feel, leaving skin soft, supple, and delicately scented with our signature ocean breeze fragrance.',
        ingredients: ['Shea Butter', 'Coconut Oil', 'Ceramides', 'Glycerin', 'Vitamin E', 'Jojoba Oil'],
        benefits: ['24hr deep hydration', 'Repairs skin barrier', 'Softens rough skin', 'Non-greasy formula', 'Signature ocean scent'],
        weight: '250ml',
        price: 799,
        category: 'Body Care',
        image: '/images/body-lotion.jpg',
        badge: 'Top Rated',
        isFeatured: false,
        rating: 4.6,
        reviews: 156,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+body+lotion',
      },
      {
        name: 'Hyaluronic Acid Hydra Gel',
        tagline: 'Quench your skin\'s thirst',
        description: 'A powerhouse of hydration, our Hyaluronic Acid Hydra Gel features multi-molecular weight hyaluronic acid that penetrates deep into the skin layers for long-lasting moisture. This gel-cream formula plumps fine lines, restores elasticity, and creates a dewy, glass-skin effect.',
        ingredients: ['Multi-Molecular Hyaluronic Acid', 'Panthenol', 'Centella Asiatica', 'Peptides', 'Rose Water'],
        benefits: ['Plumps fine lines', 'Glass skin effect', 'Long-lasting hydration', 'Calms irritation', 'Boosts elasticity'],
        weight: '50ml',
        price: 1199,
        category: 'Serums',
        image: '/images/hydra-gel.jpg',
        badge: 'Premium',
        isFeatured: false,
        rating: 4.8,
        reviews: 67,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+hyaluronic+acid',
      },
      {
        name: 'SPF 50+ Glow Sunscreen',
        tagline: 'Protect and perfect your glow',
        description: 'Our lightweight, non-whitening SPF 50+ Sunscreen provides broad-spectrum protection against UVA and UVB rays while giving your skin a natural, lit-from-within glow. Enhanced with antioxidants and skin-loving ingredients, it doubles as a primer for smooth makeup application.',
        ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide', 'Vitamin C', 'Hyaluronic Acid'],
        benefits: ['Broad-spectrum SPF 50+', 'No white cast', 'Natural glow finish', 'Water-resistant', 'Works as primer'],
        weight: '60g',
        price: 899,
        category: 'Sun Care',
        image: '/images/sunscreen.jpg',
        badge: 'Must Have',
        isFeatured: false,
        rating: 4.9,
        reviews: 312,
        buyUrl: 'https://www.flipkart.com/search?q=the+wave+sunscreen',
      },
    ];
    await Product.insertMany(products);
    res.json({ success: true, message: `${products.length} products seeded successfully` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, seedProducts };
