var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Use the require method to import the instance of sequelize that was instantiated in the models/index.js file when using the sequelize CLI
const { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

async () => {
  sequelize.sync();

  try {
    await sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// static middleware (automatically generated)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);


// ERROR HANDLERS
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("Handling 404 error");

  // Create new error to handle non-existent routes
  const err = new Error("err");
  err.status = 404;
  err.message = "Sorry! We couldn't find the page you were looking for.";
  
  res.render('page-not-found', {err});
});

// global error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message || "Sorry! There was an unexpected error on the server.";
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message, err.status);

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err});
});

module.exports = app;
