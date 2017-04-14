var router = require('express').Router();
var Category = require('../models/category');

// admin get route to add category
router.get('/add-category', function(req, res, next) {
  res.render('admin/add-category', { message: req.flash('success')});
});

// admin post route to create new category
router.post('/add-category', function(req, res, next) {
  var category = new Category();
  category.name = req.body.name;

  category.save(function(err) {
    if (err) return next(err);
    req.flash('success', 'Successfully added a category');
    return res.redirect('/add-category');
  });
});


module.exports = router;
