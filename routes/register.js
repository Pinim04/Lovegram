var express = require("express");
var router = express.Router();

const mysql = require("mysql2");
require("dotenv").config();

//Manage Database
const conn = mysql.createConnection({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
});

router.get("/", function (req, res, next) {
  res.render("register", { title: "Registrati" });
});

router.post("/", (req, res) => {
  const citta = "SELECT Nome FROM Citta WHERE Nome = ?;";
  conn.query(citta, [req.citta], function (err, rows, fields) {
    if (err) {
      console.error("Errore nella query:", err);
    }
    if (!rows) {
      const insCitta = "INSERT INTO Citta VALUES (NULL, ?);";
      conn.query(insCitta, [req.citta], function (err, rows, fields) {
        if (err) {
          console.error("Errore nella query:", err);
        }
      });
    }
  });

  const inserimento =
    "INSERT INTO Utente (Username, Email, Pwd, Nome, Cognome, Sesso, Ddn, IdCitta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, (SELECT IdCitta FROM Citta WHERE Citta = ?));";
  conn.query(
    inserimento,
    [
      req.username,
      req.email,
      req.pwd,
      req.nome,
      req.cognome,
      req.sesso,
      req.ddn,
      req.citta,
    ],
    function (err, rows, fields) {
      if (err) {
        console.error("Errore nella query:", err);
      }

      const user = rows[0];
      log(rows);

      // Controllo se l'utente esiste e se la password coincide
      if (!user || user.Pwd !== password) {
        console.error("Credenziali errate");
        return res.render("login", { errorMessage: "Credenziali errate" });
      } else {
        // Dopo la validazione dei dati dell'utente, reindirizzo l'utente alla pagina di home
        req.session.user = username;
        res.redirect("/home");
      }
    }
  );
});

module.exports = router;
