var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { nevbar_text: 'Dashboard', title: 'Express' });
});

module.exports = router;
