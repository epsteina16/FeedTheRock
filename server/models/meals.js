var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	recipe: String,
	image: String,
	dietLabels: [String],
	healthLabels: [String],
	calories: Number,
	totalNutrients: Object
});

module.exports = mongoose.model("meals", schema);