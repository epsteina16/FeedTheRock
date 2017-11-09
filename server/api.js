var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//database models
var celebrity = require('./models/celebrity');

mongoose.connect('mongodb://localhost/test');

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


module.exports = router;