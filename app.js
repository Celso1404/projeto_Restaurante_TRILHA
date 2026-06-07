var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var redisClient = redis.createClient();
var formidable = require('formidable');
var path = require('path');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();
app.use(function(req, res, next){
  let contentType = req.headers["content-type"];

  if(req.method === 'POST' && contentType && contentType.startsWith('multipart/form-data')){
    var form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, "/public/images"),
      keepExtensions: true
    });
    form.parse(req, function(err, fields, files){
      let bodyData = {};
      for (let key in fields) {
        bodyData[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      }

      let filesData = {};
      for (let key in files) {
        let file = Array.isArray(files[key]) ? files[key][0] : files[key];
        
        filesData[key] = {
          ...file,
          path: file.filepath || file.path,
          name: file.originalFilename || file.name
        };
      }
      req.body = bodyData;
      req.fields = bodyData;
      req.files = filesData;
      next();
    });

  } else {
    next();
  }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  //store: new RedisStore({
    //client: redisClient
  //}),
  secret:'p@ssw@ord',
  resave:true,
  saveUninitialized:true 
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
