var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	imageLink: String,
	age: Number,
	height: Number,
	weight: Number,
	name: String,
	gender: String,
	isVegan: Boolean,
	isVegetarian: Boolean,
	isGlutenFree: Boolean,
	exerciseLevel: String,
	partyLevel: String
});

module.exports = mongoose.model("celebrity", schema);