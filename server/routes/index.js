var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Ajax = mongoose.model('Ajax');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res){
  console.log(req.body);
  res.send(req.body);
});


/*POST registration data*/
router.post('/register', function(req, res){
  var ajax_data = new Ajax(req.body);
  console.log(ajax_data);
  ajax_data.save(function(err, ajax_data) {
    if (err) {
      return next(err);
    }
    res.send(req.body);
  });
});

module.exports = router;
