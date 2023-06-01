var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Registrati' });
  }
);

 router.post('/insert', function(req, res, next) {
  const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: 3000,
    user: "TheRealCovez",
    password: "Leocove21",
    database: "Lovegram"
  });

  app.post('/submit', (req, res) => {
    const username = req.body.username;

    const qInsert = "INSERT INTO Utente (Username) VALUES ('${username}')";
    
    connection.qInsert(qInsert, (error, results) => {
      if(error) {
        console.error('Error inserting user: ', error);
        return res.status(500).send('Error inserting user');
      }

      return res.status(200).send('User insert successfully');
    });
  });

  
});

module.exports = router;
