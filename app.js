var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var signupRouter = require('./routes/signup');

//Sequelize--------------------------------------------------------------------------------
require('dotenv').config()
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
const sequelizeConnectionTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize - Connection has been established successfully.');
  } catch (error) {
    console.error('Sequelize - Unable to connect to the database:', error);
  }
}
sequelizeConnectionTest();
//Sequelize--------------------------------------------------------------------------------

var app = express({ path: '.env' });

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('views', './views');

console.log(__dirname);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css2', express.static(path.join(__dirname, 'public/stylesheets/')))


console.log(__dirname);

app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/signup', signupRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
