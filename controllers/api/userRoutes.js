const router = require('express').Router();
// create a user
router.post('/signup', (req, res) => {
  console.log(req.body)
  User.create(req.body)
    .then(user => res.json(user))
})

module.exports = router;