const router = require('express').Router();
const path = require('path');

// Routers(Each Menus in nev bar)
var homeRouter = require('./home');
var dashboardRouter = require('./dashboard');
var loginRouter = require('./login');
var logoutRouter = require('./logout');
var signupRouter = require('./signup');
// Router(api)
const apiRoutes = require('./api');

router.use('/', homeRouter);
router.use('/home', homeRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/dashboard', dashboardRouter);
router.use('/signup', signupRouter);
// Router(api)
router.use('/api', apiRoutes);

module.exports = router;