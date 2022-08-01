var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
    text: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
    author: String,
    likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);