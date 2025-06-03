const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/blogs', require('./articleRoutes'));
router.use('/categories', require('./categoryRoutes'));

module.exports = router;
