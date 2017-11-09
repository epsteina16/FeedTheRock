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

//get celebrity route
//returns in JSON the celebrity document for the given celebrity name
router.get("/getCelebrity/:celebrityName", function(req, res){
	var celebrityName = req.params.celebrityName;

	celebrity.findOne({"name": name}, function(err, celeb){
		if (err) {
			console.log("Bad request made to getCelebrity");
			return res.status(500).send();
		} else {
			if (!celeb) {
				console.log("Bad request made to getCelebrity");
				return res.status(500).send();
			}
			return res.status(200).send(celeb);
		}
	});
});

module.exports = router;