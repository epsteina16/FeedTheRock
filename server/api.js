var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

//database models
var celebrity = require('./models/celebrity');

router.getTenCelebrities(function(req, res)){
	celebrity.find({}, function(err, obj){
		if (err) {
			return res.status(500);
		}
		obj.toArray();
		var rando = Math.random();
		for(int i = 0; i < 10; i++){
			rando = Math.random() * obj.length;
			json = JSON.stringify(obj[rando]);
			bigJSON[i] = json;
		}
		JSON.stringify(bigJSON);
	});
}

router.use(function(req, res, next){
	console.log("In API");
	next();
});

module.exports = router;