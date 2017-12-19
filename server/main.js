import express from 'express';
var app = express();

let port = 3000;

// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅합니다.
app.use('/', express.static(__dirname + '/../public'));

app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});

// 라우트 예제입니다.
import posts from './routes/posts';
app.use('/posts', posts);


const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});



/*
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
// var index = require('./index.html');
var users = require('./routes/users');

var app = express();
var server;
var router;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

server = app.listen(3000, function () {
    console.log("Express server has started on port 3000");
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);

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

router = require('./public/javascripts/main')(app, fs);
*/

// module.exports = app;
// module.exports = function(app, fs);
