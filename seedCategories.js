// seedCategories.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI;

const categories = [
  { name: 'Technology' },
  { name: 'Health' },
  { name: 'Science' },
  { name: 'Business' },
  { name: 'Education' },
  { name: 'Entertainment' },
  { name: 'Lifestyle' },
  { name: 'Travel' },
  { name: 'Food' },
  { name: 'Sports' },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Category.deleteMany();
    console.log('Old categories removed');

    await Category.insertMany(categories);
    console.log('New categories inserted');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
