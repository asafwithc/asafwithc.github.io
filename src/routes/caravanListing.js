var express = require('express');
const router = express.Router();

//const { check } = require('express-validator/check');

const caravanListing = require('../controllers/caravanListingController');

router.post('/list', caravanListing.postAddCaravanListing);

router.get('/list', caravanListing.getGetCaravansOfUser);

module.exports = router;