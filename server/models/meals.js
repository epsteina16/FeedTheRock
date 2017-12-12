var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	recipe: String,
	image: String,
	calories: Number,
	totalNutrients: Schema.Types.Mixed
});

module.exports = mongoose.model("meals", schema);