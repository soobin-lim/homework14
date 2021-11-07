const router = require('express').Router();

const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/dashboard', dashboardRoutes);
router.use('/users', userRoutes);
router.use('/home', homeRoutes);

module.exports = router;