const Sequelize = require('sequelize')
const UserModel = require('./user')
const BlogModel = require('./blog')
const TagModel = require('./tag')
const sequelize = require('../config/connection')

const User = UserModel;
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);

module.exports = {
  User,
  Blog,
  Tag
}