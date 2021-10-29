var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('logout', { title: 'Express', nevbar_text: 'logout' });
});

module.exports = router;
