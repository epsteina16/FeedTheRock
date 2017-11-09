var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

//database models
var celebrity = require('./models/celebrity');

mongoose.connect('mongodb://localhost/test');

router.use(function(req, res, next){
	console.log("In API");
	next();
});

module.exports = router;