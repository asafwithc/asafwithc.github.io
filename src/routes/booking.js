var express = require('express');
var router = express.Router();
var jwtAuth = require("../middlewares/jwtAuth");

const bookingController = require('../controllers/bookingController')

router.post('/booking', jwtAuth.authorize, bookingController.postBooking);

module.exports = router;