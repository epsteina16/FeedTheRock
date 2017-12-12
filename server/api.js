var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var schedule = require('node-schedule');
var request = require('request');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://heroku_sp1cfplm:m93lcp3m90qar7p8tj3cv07cke@ds153015.mlab.com:53015/heroku_sp1cfplm");

//database models
var celebrity = require('./models/celebrity');
var highscore = require('./models/highscore');
var meals = require('./models/meals')

router.get("/getThreeCelebrities", function(req, res){
	console.log("here");
	celebrity.find({}, function(err, obj){
		if (err) {
			return res.status(500);
		}
		console.log("yup");
		var objArray = obj;
		console.log("length of Array is " + objArray.length);
		var threeCelebs = [];
		var celeb;
		for(var i = 0; i < 3; i++){
			rando = Math.floor(Math.random() * objArray.length);
			console.log(rando);
			celeb = objArray[rando];
			objArray.splice(rando, 1);
			threeCelebs.push(celeb);
		}
		//var result = JSON.stringify(threeCelebs);
		return res.status(200).send(threeCelebs);
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

	console.log(celebrityName);

	celebrity.findOne({"name": celebrityName}, function(err, celeb){
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
			var sortedScores = highscores;
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
});

const recipes = ["egg", "pancakes", "waffles", "french toast", "eggs and potatoes", "corned beef hash", "cereal", "scrambled eggs", "oatmeal", "fruit", "breakfast burrito", "yogurt", "parfait", "burrito", "quesadilla", "sushi", "sandwich", "pasta", "curry", "wrap", "burger", "hot dog", "soup", "salad", "rice", "beans", "shrimp", "steak", "tempura", "duck", "lamb", "vegetarian", "pizza", "pasta and meatballs", "tikka masala", "grilled", "fried"]
var count = 0;

var j = schedule.scheduleJob('/30 * * * * *', function(){
	console.log("MEMEING");
	console.log(recipes[count]);
	var url = "https://api.edamam.com/search?q=" + recipes[count] + "&app_id=b387bdfd&app_key=75e18472c4a3e6bfc9fac10d5ce607c7";
	request(url, function(error, response, body){
		if (!error && response.status == 200) {
			var result = body;
			var recipe;
			for (var i = 0; i < result.hits.length; i++){
				recipe = result.hits[i].recipe;
				console.log(recipe);
				var newMeal = new meals({
					recipe: recipe.label,
					image: recipe.image,
					calories: recipe.calories,
					totalNutrients: recipe.totalNutrients
				});

				newMeal.save(function(err, result){
					if (err) {
						console.log(err);
					}
				});
			}
		} else {
			console.log(response.status);
			console.log(error);
		}
	});

	count++;
});

module.exports = router;