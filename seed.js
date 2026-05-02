require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    
    const products = [
      {
        name: 'Invisible Clinical Dry Shampoo',
        tagline: 'Fresh Roots. Instant Confidence.',
        description: 'A revolutionary clinical-grade dry shampoo that absorbs oil while providing instant volume and bounce. Enriched with Vitamin E and Kaolin, it refreshes your hair between washes without drying out the scalp.',
        ingredients: ['Vitamin E', 'Kaolin', 'Micro-Porous Rice Starch', 'Rosemary Extract'],
        benefits: ['Oil Absorbent Formula', 'Instant Volume & Bounce', 'Refreshes Without Drying Out', 'Scalp pH Optimization'],
        weight: '100ml',
        price: 899,
        category: 'Hair Care',
        image: '/images/product1.jpeg',
        images: ['/images/product1.jpeg', '/images/product1_description.jpeg'],
        badge: 'Value Combo',
        isFeatured: true,
        rating: 4.9,
        reviews: 1240,
        buyUrl: 'https://www.flipkart.com/wave-limited-offer-dry-shampoo-pack-2/p/itm1bd22a37a1fd1?pid=SMPHMTUF3BFCJHDS&lid=LSTSMPHMTUF3BFCJHDSLB3BSS&marketplace=FLIPKART&q=the+wave+dey+shampop&store=g9b%2Flcf%2Fqqm%2Ft36&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=20ca8e98-e78f-439d-9356-b5c1bb52ec1a.SMPHMTUF3BFCJHDS.SEARCH&ppt=sp&ppn=sp&qH=0d240eb88b33c496&ov_redirect=true&ov_redirect=true',
        howToUse: 'Shake vigorously before use. Hold 10 inches from roots and spray evenly. Wait 30 seconds for the bio-actives to activate, then massage into the scalp. Brush through for a flawless, refreshed look.',
      },
      {
        name: 'Atlantic Therapeutic Spa Salt',
        tagline: 'Radiant Skin. Youthful Glow.',
        description: 'A premium therapeutic spa salt featuring Himalayan pink salt for deep exfoliation and hyaluronic acid for intense hydration. Designed to remove dead skin cells and reveal a smooth, radiant glow.',
        ingredients: ['Himalayan Pink Salt', 'Hyaluronic Acid', 'Vitamin C', 'Olive Oil'],
        benefits: ['Deep Exfoliation', 'Radiant Youthful Glow', 'Hydration Lock', 'Dead Skin Removal'],
        weight: '500g',
        price: 299,
        category: 'Body Care',
        image: '/images/product2.jpeg',
        images: ['/images/product2.jpeg', '/images/product2_description.jpeg', '/images/salt.jpeg', '/images/salt2.jpeg'],
        badge: 'Best Seller',
        isFeatured: true,
        rating: 4.8,
        reviews: 3500,
        buyUrl: 'https://www.flipkart.com/wave-intense-glowing-spa-salt/p/itmccf5ddfe24351?pid=BSLHHVF88MDCTWRG&lid=LSTBSLHHVF88MDCTWRGI1KRTQ&marketplace=FLIPKART&q=the+wave+spa+salt&store=g9b%2F5nz%2Fb1b%2Fces&srno=s_1_5&otracker=search&otracker1=search&fm=Search&iid=90b271d8-5424-46f0-9a7b-6b6af1442f4f.BSLHHVF88MDCTWRG.SEARCH&ppt=sp&ppn=sp&ssid=k9uxwrcqbk0000001777750433803&qH=79d8a824fb801c4b&ov_redirect=true&ov_redirect=true',
        howToUse: 'Wet your skin, apply a small amount, gently massage in circular motions for a few minutes (leaving it on for about 3 min), then rinse thoroughly with clean water. Follow with a moisturizer for best results.',
      },
    ];
    
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
};

seed();

