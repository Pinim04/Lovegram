var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.user) {
    // L'utente non è autenticato, ritorna alla pagina Home
    res.redirect('/home');
  } else {
    res.render('login', { title: 'Login' });
  }
});

router.post('/', function(req, res, next) {
  
  //definizione varaibili username e password
  const username = req.body.username;
  const password = req.body.password;
  
  // Esecuzione dei controlli per la validazione
  if (!username || !password) {
    //window.alert("User pwd rischiesti");
  }

  
  // Query per ricercare l'username e la password all'interno del database
  const query = "SELECT Username, Pwd FROM Utente WHERE Username = " + pool.escape(username) + ";";
  
  console.log("dasasd");
  pool.query(query, [username, password], function(err, rows, fields) {
    if (err) {
      console.error('Errore nella query:', err);
      //window.alert("Errore servizio interno");
    }

    const user = rows[0];

    // Controllo se l'utente esiste e se la password coincide
    if (!user || user.Pwd !== password) {
      //window.alert("non validi")
    }

    // Dopo la validazione dei dati dell'utente, reindirizzo l'utente alla pagina di home
    req.session.user = username;
    //res.redirect('/home');
    
  });
});

module.exports = router;
