var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.username = undefined;

  if (req.session.username == undefined) {
    req.session.username = '';
  }

  res.render('logout',
    {
      title: 'Express', 
      nevbar_text: 'The Tech Blog ' + req.session.username,
      username: req.session.username
    });
});

module.exports = router;
