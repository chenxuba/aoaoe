var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')//新加 
const mongoose = require("mongoose");
const db = require("./config/keys.js").mongoURL
mongoose.connect(db,{useNewUrlParser:true})
        .then((res) => {
          console.log("远程数据库连接成功～～")
        }).catch((err) => {
          console.log(err)
          
        });

var indexRouter = require('./routes/shoplists');
var usersRouter = require('./routes/users');
var discountsRouter = require('./routes/discounts');
var bannersRouter = require('./routes/banners');
var menusRouter = require('./routes/menus');
var classRouter = require('./routes/class');
var foodRouter = require('./routes/foods');
var discoverRouter = require('./routes/discover');
var LoginRouter = require('./routes/login');
var DianzipingRouter = require('./routes/dianziping');

var app = express();


//express 设置允许跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,X-File-Name,authorization");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Cache-Control","no-store");
  if(req.method == 'OPTIONS'){
    res.sendStatus(200).end();
  }else{
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api', usersRouter);
app.use('/api', discountsRouter);
app.use('/api', bannersRouter);
app.use('/api', menusRouter);
app.use('/api', classRouter);
app.use('/api', foodRouter);
app.use('/api', discoverRouter);
app.use('/api', LoginRouter);
app.use('/api', DianzipingRouter);



//新加
// app.use(session({
//   secret: '12345',
//   cookie: {maxAge: 1000*60*60*24 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
//   resave: false,
//   saveUninitialized: true,
// }));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
