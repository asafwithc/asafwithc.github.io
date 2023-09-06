var express = require('express');
var router = express.Router();

const paymentController = require('../controllers/paymentController');

router.post('/payment', express.json(), paymentController.paymentSheet);

// router.get('/success', paymentController.success);

router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.managePostPayment);

module.exports = router;