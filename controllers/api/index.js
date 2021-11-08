const router = require('express').Router();

const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/dashboard', dashboardRoutes);
router.use('/users', userRoutes);
router.use('/home', homeRoutes);
router.use('/blog', blogRoutes);

module.exports = router;