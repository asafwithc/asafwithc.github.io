var auth = require('../services/firebase');
var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    console.log("sa");
});

module.exports = router;
