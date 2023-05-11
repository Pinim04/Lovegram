var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.router('home', {title: "ciao"});
});

module.exports = router;
