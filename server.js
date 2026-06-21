require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      /localhost:\d+$/,
      /\.vercel\.app$/,
      process.env.FRONTEND_URL,
    ].filter(Boolean);
    if (!origin || allowed.some(p => (typeof p === 'string' ? p === origin : p.test(origin)))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => res.json({ message: '🌊 Mediglow Wave API is running!' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
