var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://heroku_sp1cfplm:m93lcp3m90qar7p8tj3cv07cke@ds153015.mlab.com:53015/heroku_sp1cfplm");


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

router.post('/addCelebrity', function(request, response) {
	var imageLink = request.body.imageLink;
	var age = request.body.age;
	var height = request.body.height;
	var weight = request.body.weight;
	var name = request.body.name;
	var gender = request.body.gender;
	var isVegan = request.body.isVegan;
	var isVegetarian = request.body.isVegetarian;
	var isGlutenFree = request.body.isGlutenFree;
	var exerciseLevel = request.body.exerciseLevel;
	var partyLevel = request.body.partyLevel;

	var newCelebrity = new celebrity({
		"imageLink":imageLink, 
		"age":age,
		"height":height,
		"weight":weight, 
		"name":name,
		"gender":gender, 
		"isVegan":isVegan, 
		"isVegetarian":isVegetarian, 
		"isGlutenFree":isGlutenFree, 
		"exerciseLevel":exerciseLevel, 
		"partyLevel":partyLevel 
	});

	newCelebrity.save(function (err, newCelebrity) {
  		if (err) {
  			return response.status(500);
  		}
  		else {
  			return response.status(200);
  		}
	});
	response.send();
}) 

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