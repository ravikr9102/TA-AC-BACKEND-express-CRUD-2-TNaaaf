var express = require('express');
var article = require('../models/article');
var router = express.Router();

var comment = require('../models/comment');


router.get('/:commentId/edit',(req,res,next) => {
    var commentId = req.params.commentId;
    comment.findById(commentId,(err,comment) => {
        if(err) return next(err);
        res.render('editComment',{ comment })
    });
});

router.post('/:id',(req,res,next) => {
    var id = req.params.id;
    comment.findByIdAndUpdate(id,req.body,(err,comment) => {
        if(err) return next(err);
        res.redirect('/article/' + comment.articleId)
    });
});

router.get('/:id/delete',(req,res,next) => {
    var id = req.params.id;
    comment.findByIdAndDelete(id,(err,comment) => {
        if(err) return next(err);
        article.findByIdAndUpdate(comment.articleId ,{$pull: {comment: comment.id}},(err,article) => {
            if(err) return next(err);
            res.redirect('/article/' + comment.articleId)
        });
    });
});


module.exports = router;