var router = require('express').Router();




// homepage Route
router.get('/', function(req, res) {
  res.render('main/home');
});

// about page Route
router.get('/about', function(req, res) {
  res.render('main/about');
});



module.exports = router;
