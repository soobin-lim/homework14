const router = require('express').Router();
const { User } = require('../../models');

// create a user
router.post('/signup', (req, res) => {
  console.log(req.body)
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err=>console.log(err))
})

// login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    console.log(userData.testvalue)
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.render('home', {
        username: req.session.username,
        logged_in: req.session.logged_in
      });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;