var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log("hi");
    next();
});

router.post('/', function (req, res, next) {
    console.log("hi");
    next();
});

module.exports = router;

