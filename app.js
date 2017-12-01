var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 8888));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//import api
var api = require('./server/api');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//use api route
app.use('/api', api);

// Main route
app.get('/', function(req,res){
  //TODO: send react index.html file
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Not Found");
  next();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
