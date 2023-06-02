const { log } = require("console");
var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql2");

require("dotenv").config();

//Manage Database
const pool = mysql.createPool({
  connectionLimit: process.env.DB_MAX_CONN,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
});

// generarte express app
var app = express();

//live reload
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// session management
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

var homeRouter = require("./routes/home");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var chatRouter = require("./routes/chat");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//connec reloader to middleware
app.use(connectLiveReload());

app.use("/login", loginRouter);
app.use(function (req, res, next) {
  if (!req.session.usr && process.env.DEV != "true") {
    // User is not authenticated, redirect to the login page
    res.redirect("/login");
  } else {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  }
});
app.use("/", homeRouter);
app.use("/home", homeRouter);
app.use("/register", registerRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
