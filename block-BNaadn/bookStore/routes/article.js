var express = require('express');
var router = express.Router();

var article = require('../models/article');
var comment = require('../models/comment');

// list article
router.get('/', (req, res, next) => {
  article.find({}, (err, article) => {
    if (err) return next(err);
    res.render('article', { article: article });
  });
});

// // create article form
router.get('/new', (req, res) => {
  res.render('addArticle');
});

// fetch single article
// router.get('/:id',(req,res,next) => {
//   var id = req.params.id
//   article.findById(id,(err,article) => {
//     console.log(article);
//     if(err) return next(err);
//     res.render('articleDetail', { article })
//   });
// });

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  article
    .findById(id)
    .populate('comment')
    .exec((err, article) => {
      if (err) return next(err);
      res.render('articleDetail', { article });
    });
});

// // create Article
router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(' ');
  article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect('/article');
  });
});

// // edit article form
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  article.findById(id, (err, article) => {
    article.tags = article.tags.join(' ');
    if (err) return next(err);
    res.render('editArticle', { article });
  });
});

// // update Article
router.post('/:id', (req, res) => {
  var id = req.params.id;
  req.body.tags = req.body.tags.split(' ');
  article.findByIdAndUpdate(id, req.body, (err, updateData) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
  });
});

// // delete Article
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    comment.remove({ articleId: article.id }, (err) => {
      if (err) return next(err);
      res.redirect('/article');
    });
  });
});

// increment like
router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
  });
});

// decrement like
router.get('/:id/Dislikes', (req, res, next) => {
  var id = req.params.id;
  article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
  });
});

router.post('/:articleId/comment', (req, res, next) => {
  var articleId = req.params.articleId;
  req.body.articleId = articleId;
  comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    console.log(comment, 'comment created');
    article.findByIdAndUpdate(
      articleId,
      { $push: { comment: comment.id } },
      (err, article) => {
        if (err) next(err);
        res.redirect('/article/' + articleId);
      }
    );
  });
});

module.exports = router;
