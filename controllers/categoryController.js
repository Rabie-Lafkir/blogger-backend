const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const cat = new Category({ name: req.body.name });
  await cat.save();
  res.status(201).json(cat);
};

exports.getCategories = async (_req, res) => {
  const cats = await Category.find();
  res.json(cats);
};
