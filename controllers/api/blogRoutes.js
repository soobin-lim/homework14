const router = require('express').Router();
const { User, Blog, Tag, BlogTag } = require('../../models');

router.get('/byid/:id', async (req, res) => {
  var blogId = req.params.id;
  const blogData = await Blog.findByPk(blogId)
  console.log(JSON.stringify(blogData) + 'blogData in controller')
  res.json(blogData);
})

router.put('/', async (req, res) => {
  var title = req.body.title;
  var content = req.body.content;
  var blogId = req.body.blogId;

  response = await Blog.update(
    { title: title, content: content },
    { where: { id: blogId } }
  )
  console.log('update response : ' + response);

  res.status(200).json(response);
})

router.delete('/:id', async (req, res) => {
  var blogId = req.params.id;
  console.log(blogId);
  const response = await Blog.destroy(
    {
      where: {
        id: blogId
      }
    }
  );
  if (response === 1) {
    res.status(200).json({ message: "deleted ok" })
  } else {
    res.status(400).json({ message: "deleted not ok" })
  }
})

module.exports = router;