const router = require('express').Router();
const path = require('path');

// create a user
router.post('/api/users', (req, res) => {
  User.create(req.body)
      .then(user => res.json(user))
})
// get all users
router.get('/api/users', (req, res) => {
  User.findAll().then(users => res.json(users))
})
// create a blog post
router.post('/api/blogs', (req, res) => {
  const body = req.body
  // either find a tag with name or create a new one
  const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name }})
                                       .spread((tag, created) => tag))
  User.findById(body.userId)
      .then(() => Blog.create(body))
      .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
      .then(blog => Blog.findOne({ where: {id: blog.id}, include: [User, Tag]}))
      .then(blogWithAssociations => res.json(blogWithAssociations))
      .catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.`}))
})

module.exports = router;