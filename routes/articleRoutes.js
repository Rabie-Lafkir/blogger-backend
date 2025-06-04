const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload'); // multer middleware

router.post('/', authenticate, upload.single('coverImage'), articleController.createArticle);
router.get('/', articleController.getArticles);
router.get('/:slug', articleController.getArticle);
router.put('/:id', authenticate, upload.single('coverImage'), articleController.updateArticle);
router.delete('/:id', authenticate, articleController.deleteArticle);

module.exports = router;