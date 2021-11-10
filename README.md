# Link to deployed application (Heroku)
https://glacial-mesa-78198.herokuapp.com/login

# How to work app
1.Sign in 
  Login -> Sign up instead

2. Log in
Login -> log in

3. Create a New Post
Dashboard -> New Post

4. Update and Delete a Post
Dashboard -> clicking title of new posts -> update and delete posts

5. Add a comment
Home -> clicking title of posts -> add a comment

# bin/www folder
The structure of app is done by express-generator

# config/config.js, config/connection.js file
config.js -> Created by sequelize-cli (define dev-environment)
sequelize = new Sequelize(process.env.JAWSDB_URL);

# controllers
api/dashboardRoutes.js -> create a Blog(title, content, userId)
api/blogRoutes.js  -> delete a Blog, findAll, findbyPk, etc
api/userRoutes.js -> sign in, log in

home.js -> Blog.findAll() -> pass all blog data to front end view (home)
dashboard.js -> Blog.findAll() -> pass all blog data to front end view (dashboard)

# views
home.pug
  -> receive all blog data 
  -> dynamically make a GUI For adding comment to each blog post
  -> POST comments to selected post

dashboard.pug
  -> receive all blog data
  -> dynamically make a GUI For create, update, delete a post
  -> POST(UPDATE, DELETE) a new blog (title, content)

login.pug
  -> POST(username, password) -> req.session.logged_in = true

logout.pug
  -> req.session.logged_in = false

# middleware (utils/auth.js)
Checking req.session.logged_in,
continues or redirects to Login Page

# models
Blog (title, content, userId)
Tag (comment, userId)
Blog_Tag (blogId, tagId) // created in model/index.js file
User (username, password)   
  password was protected by hook-> beforeCreate ->bcrypt.hash
  password was comparted by brypt.compare in log in

# public/javascripts
home.js 
  1. (Toggle the Comment GUI) -> let alreadyAddingComment;
  Checking if Hidden GUI(For Adding Comment) is shown or not. 

  2. If user clicks title of blog post -> Show <Input> and <Submit> to add a comment

  3. <Submit> button -> POST the comment

dashboard.js
  1. First show list of blog post 
    var mainElement = document.getElementById('main');
  
  2. Show New Post GUI (Create a new Post)
    var newpost = document.getElementById('newpost');

  3. Show Update and Delete GUI (Update and Delete a Post)
    var updateanddeleteDiv = document.getElementById('updateanddelete')

login.js

signup.js








# Sequelize
The Express-Sequelize generator
I created model/index.js file automatically (npm install sequelize --save)

I used format of this blog to define models in (index.html)
https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz



# pug technology
I saw that express-generator was using pug files in views
So I decided to use pug files for views folder


# Errors
My Git hub : 

  MVC Homework Github
  https://github.com/soobin-lim/homework14.git
    Same code as Activities in 14.MVC

  original: Error: connect ECONNREFUSED ::1:3306
  https://stackoverflow.com/questions/30266221/node-js-mysql-error-connect-econnrefused
  =>
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

  mysql client doesn't recognize localhost as 127.0.0.1 today.
  Why?
  This caused issues in setting up a local dev environment on MacOS.
  https://stackoverflow.com/questions/19712307/mysql-localhost-127-0-0-1
  https://www.tecmint.com/fix-mysql-error-1819-hy000/

  mysql clients treat localhost and 127.0.0.1 differently, see

  https://serverfault.com/questions/295285/mysql-cannot-connect-via-localhost-only-127-0-0-1/295300#295300