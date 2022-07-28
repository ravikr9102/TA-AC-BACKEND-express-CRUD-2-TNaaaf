var express = require('express');
var router = express.Router();
var article = require('../models/article')

var article = require('../models/article');


router.get('/',(req,res,next) => {
  article.find({},(err,article) => {
    if(err) return next(err);
    res.render('article',{ article: article })
  });
});


router.get('/new',(req,res) => {
  res.render('addArticle')
});


router.post('/',(req,res) => {
  console.log(req.body);
  article.create(req.body,(err,createdArticle) => {
   if(err) return next(err);
   res.redirect('/article')
  });
});

router.get('/:id',(req,res,next) => {
  var id = req.params.id;
  article.findById(id,(err,article) => {
    if(err) return next(err)
    res.render('articleDetail',{ article: article })
  });
});

router.get('/:id/edit',(req,res,next) => {
  var id = req.params.id;
  article.findById(id,(err,article) => {
    if(err) return next(err)
    res.render('editAddArticle',{ article: article })
  });
});

router.post('/:id',(req,res,next) => {
  var id = req.params.id;
article.findByIdAndUpdate(id,req.body,(err,updateArticle) => {
  if(err) return next(err);
  res.redirect('/article/'+ id)
});
});

router.get('/:id/delete',(req,res,next) => {
  var id = req.params.id;
  article.findByIdAndDelete(id,(err,article) => {
    if(err) return next(err);
    res.redirect('/article')
  })
})


module.exports = router;
