var auth = require('../services/firebase');
var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/', async (req, res, next) => {

    const {googleAccessToken} = req.body;

    axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${googleAccessToken}`
        }}).then(ress => console.log(ress))

    console.log(googleAccessToken);

    next();

});

module.exports = router;
