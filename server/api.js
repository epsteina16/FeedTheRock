var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://heroku_sp1cfplm:m93lcp3m90qar7p8tj3cv07cke@ds153015.mlab.com:53015/heroku_sp1cfplm");

//database models
var celebrity = require('./models/celebrity');
var highscore = require('./models/highscore');

router.get("/getTenCelebrities", function(req, res){
	celebrity.find({}, function(err, obj){
		if (err) {
			return res.status(500);
		}
		var objArray = JSON.parse(obj);
		var rando = Math.random();
		var tenCelebs = [];
		var celeb;
		for(var i = 0; i < 10; i++){
			rando = Math.random() * objArray.length;
			celeb = JSON.stringify(objArray[rando]);
			tenCelebs.push(celeb);
		}
		var result = JSON.stringify(tenCelebs);
		return res.status(200).send(result);
	});
});

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
}); 

//get celebrity route
//returns in JSON the celebrity document for the given celebrity name
router.get("/getCelebrity", function(req, res){
	var celebrityName = req.query.celebrityName;

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

router.post("/addhighscore", function(req, res){
	var username = request.body.username;
	var score = request.body.score;

	var newHighscore = new highscore({
		"username":username,
		"score":score
	});

	newHighscore.save(function (err, newHighscore) {
		if (err) {
			return response.status(500);
  		}
  		else {
  			return response.status(200);
  		}
	});
	response.send();
});

router.get("/getTopTen", function(req, res){
	highscore.find({}, function(err, highscores) {
		if (!err) {
			var sortedScores = JSON.parse(highscores);
			sortedScores.sort(function(a,b) {
				return b.score - a.score;
			});
			var topTenScores;
			var count = 0;
			for (var i = (sortedScores.length - 1); i >= (sortedScores.length - 11); i--) {
				topTenScores[count] = sortedScores[i];
				count++;
			}
			var topTen = JSON.stringify(topTenScores);
			response.send(topTen);
		}
		else {
			response.send(500);
		}
	})
})
module.exports = router;