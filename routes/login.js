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
  const username = req.body.usr;
  req.session.user = username;
  res.redirect('/home');
});

router.post('/validate', function(req, res, next) {
  //Esecuzione dei controlli per la validazione
  if(!username || !password)
    return res.status(400).json({ error: 'Username e password richiesti.' });
  
    //Query per ricercare l'username e la password all'interno del databasse
    pool.query("SELECT Username, Pwd FROM Utente WHERE Username = ? AND Pwd = ?", function(err, rows, fields){
      if (err) {
        console.error('Errore nella query:', err);
        return res.status(500).json({ error: 'Errore del server interno.' });
      }
    })

    const user = results[0];

    //Controllo se l'utente esiste e se la password coincida
    if(!user || user.password != password)
      return res.status(401).json({ error: 'Nome o password non validi.' });

    //Dopo la validazione dei dati dell'utente, invio un messaggio di successo
    res.json({ message : 'Login effettuato.' });
    


});

/*
  // Perform validation checks
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Query the database to find the user
  const query = 'SELECT * FROM users WHERE username = ?';
  pool.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    const user = results[0];

    // Check if the user exists and if the password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // User data is valid, initiate a session or generate an authentication token
    // For simplicity, we'll send a success message here
    res.json({ message: 'Login successful.' });
  });
});*/



module.exports = router;
