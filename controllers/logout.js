var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let goodByeName = req.session.username;
  req.session.username = undefined;
  if (goodByeName == ''){
    res.redirect('/login')
  }
  if (req.session.username == undefined) {
    req.session.username = '';
  }

  res.render('logout',
    {
      title: 'Express', 
      nevbar_text: 'The Tech Blog ' + req.session.username,
      username: goodByeName
    });
});

module.exports = router;
