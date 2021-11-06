# How I started to make Homework 14
I used express-generator to make a skeleton

# Sequelize
The Express-Sequelize generator
I created model/index.js file automatically (npm install sequelize --save)

I used format of this blog to define models in (index.html)
https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz



# pug technology
I saw that express-generator was using pug files in views
So I decided to use pug files for views folder


# Errors
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