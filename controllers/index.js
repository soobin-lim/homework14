const router = require('express').Router();
const path = require('path');

// Routers(Each Menus in nev bar)
var homeRouter = require('../routes/home');
var dashboardRouter = require('../routes/dashboard');
var loginRouter = require('../routes/login');
var logoutRouter = require('../routes/logout');
var signupRouter = require('../routes/signup');

router.use('/', homeRouter);
router.use('/home', homeRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/dashboard', dashboardRouter);
router.use('/signup', signupRouter);

// Routers for apis
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// login
router.post('/api/users/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.emailAddress } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.name = userData.fullName;
      req.session.email = userData.emailAddress;
      req.session.logged_in = true;

      res.render('home', {
        // We send over the current 'countVisit' session variable to be rendered
        name: req.session.name,
        email: req.session.email,
        logged_in: req.session.logged_in
      });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//logout
router.post('/api/users/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// get all users
router.get('/api/users', (req, res) => {
  User.findAll().then(users => res.json(users))
})


// create a blog post
router.post('/api/blogs', (req, res) => {
  const body = req.body
  // either find a tag with name or create a new one
  const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name } })
    .spread((tag, created) => tag))
  User.findById(body.userId)
    .then(() => Blog.create(body))
    .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
    .then(blog => Blog.findOne({ where: { id: blog.id }, include: [User, Tag] }))
    .then(blogWithAssociations => res.json(blogWithAssociations))
    .catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.` }))
})

module.exports = router;