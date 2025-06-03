const Article = require('../models/Article');
const slugify = require('../utils/slugify');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const slug = slugify(title);
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) return res.status(400).json({ error: 'Image is required' });

    const article = await Article.create({
      title,
      slug,
      content,
      image,
      category,
      tags,
      author: req.userId,
    });

    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllArticles = async (_req, res) => {
  const articles = await Article.find().populate('author', 'username');
  res.json(articles);
};

exports.getArticleBySlug = async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug }).populate('author', 'username');
  if (!article) return res.status(404).json({ error: 'Not found' });
  res.json(article);
};
