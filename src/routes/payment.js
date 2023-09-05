var express = require('express');
var router = express.Router();

const paymentController = require('../controllers/paymentController');

router.post('/payment', paymentController.paymentSheet);

router.get('/success', paymentController.success);

// router.get('/post-payment', paymentController.managePostPayment);

module.exports = router;