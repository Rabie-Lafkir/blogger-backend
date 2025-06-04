const Article = require('../models/Article');
const slugify = require('slugify');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const slug = slugify(title, { lower: true });

    const coverImage = req.file?.filename;
    if (!coverImage) return res.status(400).json({ error: 'Cover image is required' });

    const article = new Article({
      title,
      content,
      category,
      tags,
      author: req.user.id,
      slug,
      coverImage,
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
      .populate('author', 'username')
      .populate('category', 'name');
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });

    if (title) article.title = title;
    if (content) article.content = content;
    if (category) article.category = category;
    if (tags) article.tags = tags;
    if (title) article.slug = slugify(title, { lower: true });
    if (req.file) article.coverImage = req.file.filename;

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};