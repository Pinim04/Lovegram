var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("register", { title: "Registrati" });
});

const fs = require("fs");

router.post("/", (req, res) => {});

module.exports = router;
