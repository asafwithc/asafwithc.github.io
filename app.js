require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const { error } = require("console");
const errorController = require("./src/controllers/errorController");
const multer = require('multer');

var firebaseAuth = require("./src/middlewares/firebaseAuth");
var jwtAuth = require("./src/middlewares/jwtAuth");

var db = require("./src/services/database");
var firebase = require("./src/services/firebase");
//var image = require("./src/services/multer");

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/user");
var loginRouter = require("./src/routes/login");
var caravanRouter = require("./src/routes/caravan");
var caravanListingRouter = require("./src/routes/caravanListing");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/api", jwtAuth.authorize, caravanRouter);
app.use("/user/caravan-list", jwtAuth.authorize, caravanListingRouter);
app.use("/login", firebaseAuth.decodeToken, loginRouter);

/* catch 404 and forward to error handler */
app.use(errorController.catch404);

/* error handler */
app.use(errorController.get404);

module.exports = app;
