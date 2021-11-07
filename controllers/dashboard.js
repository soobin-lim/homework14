var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  
  
  if (req.session.username == undefined) {
    req.session.username = '';
  }

  res.render('dashboard',
    {
      nevbar_text: 'Your Dashboard ' + req.session.username,
      title: 'Express',
      username: req.session.username
    });
});

module.exports = router;
