var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Registrati' });
  }
);

 router.post('/insert', function(req, res, next) {
  const qCtrl = 'SELECT * FROM Utente WHERE Username = "leocove21";'
  const searchedName = form.name;
  if(queryCtrl == insertedName)
  {
    console.write("Utente già presente, si prega di inserire un username differente!");
  }
  else
  {
    const insertName = "INSERT INTO Utente (Username, Email, Pwd, Nome, Cognome, Sesso, Ddn, IdFoto, IdCitta) VALUES ('nuovo_utente', 'nuovo_utente@example.com', 'password123', 'Nuovo', 'Utente', 'Altro', '1990-01-01', 1, 1);"
  }
});

module.exports = router;
