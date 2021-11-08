var express = require('express');
const { Blog, User, Tag } = require('../models');

var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {

  let blogsArray = [];

  let blogs = await Blog.findAll({
    include: [{ model: User }],
  })

  if (blogs) {
    for (blog of blogs) {
      let tmp = [];
      tmp.push(blog.title);
      tmp.push(blog.user.username);
      tmp.push(blog.content);
      tmp.push(blog.id);
      tmp.push(blog.createdAt)
      console.log(blog.createdAt)
      // console.log(tmp)
      console.log("blog.id : " + blog.id)
      let comments = await Tag.findAll(
        {
          include: [{
            model: Blog,
            through: {
              where: {
                blogId: blog.id
                // if Tag.findall(comment) has blogs (blog.id)
              }
            }
          }],
        }
      );
      // if there are comments for blog.id 
      // I want to add information to res.render(home)
      let tmp2 = [];
      for (comment of comments) {
        // if comment has blogs (blog.id)
        if (comment.blogs.length > 0) {
          console.log(comment.id)
          console.log(comment.tag)
          tmp2.push(comment.tag)
          // console.log(comment.blogs.title)
          // console.log(comment.blogs.content)
          // console.log(comment.blogs.userId)
          // console.log(comment.blogs.blog_tag)
        }
      }
      // console.log(' how many : comments detail : ' + JSON.stringify(comments));
      tmp.push(tmp2);
      blogsArray.push(tmp);
    }
  }

  console.log(JSON.stringify(blogsArray));
  if (req.session.username == undefined) {
    req.session.username = '';
  }

  res.render('dashboard',
    {
      nevbar_text: 'Your Dashboard ' + req.session.username,
      title: 'Express',
      username: req.session.username,
      blogs: JSON.stringify(blogsArray)
    });
});

module.exports = router;
