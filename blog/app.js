var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var connDB = require('./config/connDB');
var result = require('./routes/result');
var login = require('./routes/login');
var regeit = require('./routes/regeit');
var phone = require('./routes/phone');
var weather = require('./routes/weather');
var add_shu = require('./routes/add_shu');
var weibo  = require('./routes/weibo');
var weibo1 = require('./routes/weibo1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
app.use('/result', result);
app.use('/login',login);
app.use('/regeit',regeit);
app.use('/phone',phone);
app.use('/weather',weather);
app.use('/add_shu',add_shu);
app.use('/weibo',weibo);
app.use('/weibo1',weibo1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
