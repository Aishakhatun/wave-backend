const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  description: { type: String, required: true },
  ingredients: [String],
  benefits: [String],
  weight: { type: String },
  price: { type: Number },
  category: { type: String, default: 'Skincare' },
   image: { type: String },
   images: [String],
   badge: { type: String },
  isFeatured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  buyUrl: { type: String },
  howToUse: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
