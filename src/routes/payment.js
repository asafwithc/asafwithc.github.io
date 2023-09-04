var express = require('express');
var router = express.Router();

const paymentController = require('../controllers/paymentController');

router.get('/payment', paymentController.paymentSheet);

// router.get('/post-payment', paymentController.managePostPayment);

module.exports = router;