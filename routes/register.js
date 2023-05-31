var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Registrati' });
  }
);

// router.post('/', function(req, res, next) {
//   const username = req.body.usr;
//   req.session.usr = username;
//   res.redirect('/home');
// });

module.exports = router;
