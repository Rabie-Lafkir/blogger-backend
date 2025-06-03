const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  image: String,
  category: String,
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
