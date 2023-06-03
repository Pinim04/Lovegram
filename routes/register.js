var express = require("express");
var router = express.Router();
const { log } = require("console");

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
  let newCity = false;
  const citta = "SELECT Nome FROM Citta WHERE Nome = ?;";
  conn.query(citta, [String(req.body.citta).toLowerCase()], function (err, rows, fields) {
    if (err) {
      console.error("Errore nella query:", err);
      return res.status(500).send("Internal Server Error");
    }
    log(rows);
    if (rows.length == 0) {
      log("try add city");
      const insCitta = "INSERT INTO Citta VALUES (NULL, ?);";
      conn.query(insCitta, [String(req.body.citta).toLowerCase()], function (err, rows, fields) {
        if (err) {
          console.error("Errore nella query:", err);
        } else {
          insertUser(req, res);
        }
      });
    } else {
      insertUser(req, res);
    }
  });
});

function insertUser(req, res) {
  const inserimento =
    "INSERT INTO Utenti (Username, Email, Pwd, Nome, Cognome, Sesso, Ddn, IdCitta) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT IdCitta FROM Citta WHERE Nome = ?));";
  conn.query(
    inserimento,
    [
      req.body.username,
      req.body.email,
      req.body.pwd,
      req.body.nome,
      req.body.cognome,
      req.body.sesso,
      req.body.ddn,
      String(req.body.citta).toLowerCase()
    ],
    function (err, rows, fields) {
      if (err) {
        console.error("Errore nella query:", err);
        return res.status(500).send("Internal Server Error");
      }

      res.redirect("/login");
    }
  );
}

module.exports = router;
