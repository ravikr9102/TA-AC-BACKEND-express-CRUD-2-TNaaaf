var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var articleSchema = new Schema({
	title : { type: String, required: true },
	description: String,
	tags: [String],
	author: String,
	likes: { type: Number, default:0 }
}, { timestamps:true });

module.exports = mongoose.model('article', articleSchema);