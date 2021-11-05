const Sequelize = require('sequelize')
const UserModel = require('./user')
const BlogModel = require('./blog')
const TagModel = require('./tag')
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);
console.log(sequelize)
const sequelizeConnectionTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize - Connection has been established successfully.');
  } catch (error) {
    console.error('Sequelize - Unable to connect to the database:', error);
  }
}
sequelizeConnectionTest();

const User = UserModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Blog,
  Tag
}

