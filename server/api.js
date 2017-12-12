var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var schedule = require('node-schedule');
var request = require('request');

const https = require('https');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://heroku_sp1cfplm:m93lcp3m90qar7p8tj3cv07cke@ds153015.mlab.com:53015/heroku_sp1cfplm");

//database models
var celebrity = require('./models/celebrity');
var highscore = require('./models/highscore');
var meals = require('./models/meals')

router.get("/getThreeCelebrities", function(req, res){
	var celeb1 = req.query.celeb1;
	var celeb2 = req.query.celeb2;
	var celeb3 = req.query.celeb3;

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

		while (threeCelebs.length < 3) {
			rando = Math.floor(Math.random() * objArray.length);
			celeb = objArray[rando];
			if (celeb.name == celeb1 || celeb.name == celeb2 || celeb.name == celeb3) {
				//nothing
			} else {
				objArray.splice(rando, 1);
				threeCelebs.push(celeb);
			}
		}
		
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
	console.log(request.body);
	var username = request.body.username;
	var score = request.body.score;
	console.log("here");

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

//used to add meals to db
router.post("/addMeal", function(req, res){
	var recipe = req.body.recipe;
	var image = req.body.image;
	var calories = req.body.calories;
	var totalNutrients = req.body.totalNutrients;
	var healthLabels = req.body.healthLabels;
	var dietLabels = req.body.dietLabels;

	if (recipe == undefined || image == undefined || calories == undefined || totalNutrients == undefined || healthLabels == undefined || dietLabels == undefined) {
		return res.status(500).send();
	}
	
	var newMeal = new meals({
		recipe: recipe,
		image: image,
		calories: calories,
		totalNutrients: totalNutrients,
		healthLabels: healthLabels,
		dietLabels: dietLabels
	});

	newMeal.save(function(err, result){
		if (err) {
			console.log(err);
		}
	});

	return res.status(200).send();
});

//used to get meals from db
router.get("/getMeal", function(req, res){
	var recipeName = req.query.recipeName;

	if (recipeName == undefined) {
		return res.status(500).send();
	}

	meals.find({recipe: new RegExp('^'+recipeName+'$', "i")}, function(err, recipes){
		if (err || !recipes) {
			return res.status(500).send();
		}
		else {
			return res.status(200).send(recipes);
		}
	});
});

module.exports = router;