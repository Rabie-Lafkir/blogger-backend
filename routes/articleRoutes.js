const express = require('express');
const router = express.Router();
const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// ✅ CREATE Article (protected + image upload)
router.post('/', authMiddleware, uploadMiddleware.single('image'), createArticle);

// ✅ READ all Articles (public)
router.get('/', getArticles);

// ✅ READ single Article by slug (public)
router.get('/:slug', getArticle);

// ✅ UPDATE Article (protected + image upload optional)
router.put('/:slug', authMiddleware, uploadMiddleware.single('image'), updateArticle);

// ✅ DELETE Article (protected)
router.delete('/:slug', authMiddleware, deleteArticle);

module.exports = router;
