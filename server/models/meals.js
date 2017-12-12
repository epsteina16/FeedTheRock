var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	recipe: String,
	image: String,
	calories: Number,
	totalNutrients: Object
});

module.exports = mongoose.model("meals", schema);