var express = require('express');
var helpers = require('../utils/helpers')
const withAuth = require('../utils/auth');

const { Blog, User, Tag } = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', withAuth, async function (req, res, next) {
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
      // tmp.push(blog.createdAt);
      tmp.push(helpers.format_date(blog.updatedAt));

      let comments = await Tag.findAll(
        {
          include: [{
            model: Blog,
            where: {
              id: blog.id
              // It does not search only one tag id,
              // but it searches all tags that has that blogId
              // I don't understand this query, but I accidentally found out it was working
            },
            through: {
              where: {
                blogId: blog.id
                // if Tag.findall(comment) has blogs (blog.id)
              }
            }
          },{
            model: User
          }],
        }
      );
      // console.log(`comments : ----------` + blog.id + `---------------` + JSON.stringify(comments))
      // if there are comments for blog.id 
      // I want to add information to res.render(home)
      let tmp2 = [];

      // Tag Model (comment)
      for (comment of comments) {
        // if comment has blogs (blog.id)
        if (comment.blogs.length > 0) {
          console.log(`comments : ----------` + blog.id + `---------------` + JSON.stringify(comment.user.username) + '-----')

          // console.log(comment.id)
          // console.log(comment.tag)
          // console.log(comment.user)

          let username = comment.user.username;

          let commentTagUsernameUpdatedAt = [];
          commentTagUsernameUpdatedAt.push(comment.tag)

          commentTagUsernameUpdatedAt.push(username)

          commentTagUsernameUpdatedAt.push(helpers.format_date(comment.updatedAt))
          // console.log(comment.blogs.title)
          // console.log(comment.blogs.content)
          // console.log(comment.blogs.userId)
          // console.log(comment.blogs.blog_tag)
          tmp2.push(commentTagUsernameUpdatedAt);
        }
      }
      // console.log(' how many : comments detail : ' + JSON.stringify(comments));
      tmp.push(tmp2);
      blogsArray.push(tmp);
    }
  }

  // console.log(JSON.stringify(blogsArray));

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
