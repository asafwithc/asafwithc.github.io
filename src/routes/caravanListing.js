var express = require('express');
var jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

//const { check } = require('express-validator/check');

const caravanListing = require('../controllers/caravanListingController');

router.post('/list', jwtAuth.authorize, caravanListing.postAddCaravanListing);

router.get('/list', jwtAuth.authorize, caravanListing.getGetCaravanListings);

router.put('/list/:caravanId', jwtAuth.authorize, caravanListing.updateListing);

router.delete('/list/:caravanId', jwtAuth.authorize, caravanListing.deleteListing);

module.exports = router;