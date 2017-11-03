var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

//database models

router.use(function(req, res, next){
	console.log("In API");
	next();
});