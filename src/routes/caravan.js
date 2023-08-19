var express = require('express');
var router = express.Router();

const caravanController = require('../controllers/caravanController');

router.post('/add-caravan', caravanController.postAddCaravan);

module.exports = router;
