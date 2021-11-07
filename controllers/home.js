var express = require('express');
const { Blog, User } = require('../models')
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  let blogsArray = [];

  let blogs = await Blog.findAll({
    include: [{ model: User }],
  })

  if (blogs) {
    blogs.map(blog => {
      let tmp = [];
      tmp.push(blog.title);
      tmp.push(blog.user.username);
      tmp.push(blog.content);
      blogsArray.push(tmp);
    })
  }

  console.log(JSON.stringify(blogsArray));

  if (req.session.username == undefined) {
    req.session.username = '';
  }

  res.render('home', {
    title: 'The Tech Blog',
    nevbar_text: 'The Tech Blog ' + req.session.username,
    username: req.session.username,
    blogs: JSON.stringify(blogsArray)
  });

});

module.exports = router;
