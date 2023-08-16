var auth = require('../services/firebase');
var express = require('express');
var router = express.Router();

router.get('/', async(req,res) => {
    console.log("awffa");
    /* auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((userCred) => {
            console.log(userCred);
        })
        res.status(200).json(req.body); */
});

module.exports = router;
