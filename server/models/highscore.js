var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	username: String,
	score: Number
});

module.exports = mongoose.model("highscore", schema);