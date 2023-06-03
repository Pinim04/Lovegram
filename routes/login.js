var express = require("express");
const { log } = require("console");
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
  let errorMessage = "";
  if (req.session.user) {
    // L'utente non è autenticato, ritorna alla pagina Home
    res.redirect("/home");
  } else {
    res.render("login", { title: "Login", errorMessage: null });
  }
});

router.post("/", function (req, res, next) {
  //definizione varaibili username e password
  const email = req.body.usr;
  const password = req.body.pswd;

  // Query per ricercare l'username e la password all'interno del database
  const query = "SELECT Email, Pwd FROM Utenti WHERE Email = ?;";

  conn.query(query, [email], function (err, rows, fields) {
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
      req.session.user = email;
      res.redirect("/home");
    }
  });
});

module.exports = router;
