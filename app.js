var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var session = require('express-session');   //session
//var mongoose = require('mongoose');
//var mongo = require('./routes/mongo');
var config = require('./config');
var webRouter = require('./web-router');
var app = express();
app.engine('html', require('ejs').renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('tiny'));    //控制台日志
app.use(compress());    //开启gzip

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

//app.use(session({ secret: 'keyboard cat', name: 'sid', cookie: { secure: true }}));
app.use(session({secret:'nick',resave:true, saveUninitialized:true}));   //session 设置

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));


app.use('/', webRouter);
//app.use('/mongo', mongo);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//var env = process.env.NODE_ENV || 'production';

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//connect to mongodb
// mongoose.connect(config.db.mongodb,function(err, res){
//   if(err){
//     console.log('error connecting to mongoDB'+err);
//   }else{
//     console.log('Connected to mongoDB');
//   }
// });

module.exports = app;
