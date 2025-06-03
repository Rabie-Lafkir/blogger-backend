const router = require('express').Router();
const { createArticle, getAllArticles, getArticleBySlug } = require('../controllers/articleController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', auth, upload.single('image'), createArticle);
router.get('/', getAllArticles);
router.get('/:slug', getArticleBySlug);

module.exports = router;
