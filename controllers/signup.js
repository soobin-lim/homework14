var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.session.username == undefined) {
    req.session.username = '';
  }
  
  res.render('signup', {
    title: 'Express',
    nevbar_text: 'The Tech Blog ' + req.session.username,
  });
});

module.exports = router;
