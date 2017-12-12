var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	recipe: Object
});

module.exports = mongoose.model("meals", schema);