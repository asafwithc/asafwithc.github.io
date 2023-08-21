require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { error } = require("console");
const errorController = require("./src/controllers/errorController");

var jwtAuth = require("./src/middlewares/jwtAuth");
var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/user");
var loginRouter = require("./src/routes/login");
var caravanRouter = require("./src/routes/caravan")
var db = require("./src/services/database");
var firebase = require("./src/services/firebase");

var app = express();

/* view engine setup */
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
//app.use(middleware.decodeToken);

/* silinecek */
app.use((req, res, next) => {
    console.log(req.body.googleAccessToken);
    next();
});

app.use("/", indexRouter);
app.use("/api", jwtAuth.authorize, usersRouter);
app.use("/api",caravanRouter);
app.use("/login", loginRouter);

/* catch 404 and forward to error handler */
app.use(errorController.catch404);

/* error handler */
app.use(errorController.get404);

module.exports = app;
