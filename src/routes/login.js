var auth = require('../services/firebase');
var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/', async (req, res, next) => {
    // let token = req.body.token;

    // async function verify() {
    //     const ticket = await client.verifyIdToken({
    //         idToken: token,
    //         audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    //     });
    //     const payload = ticket.getPayload();
    //     const userid = payload['sub'];
    //   }
    //   verify()
    //   .then(()=>{
    //       res.cookie('session-token', token);
    //       res.send('success')
    //   })
    //   .catch(console.error);


    // const googleAccessToken = req.body.googleAccessToken;
    // console.log(req.body)
    // axios
    //     .get("https://www.googleapis.com/oauth2/v3/userinfo", {
    //     headers: {
    //         "Authorization": `Bearer ${googleAccessToken}`
    //     }}).then().catch(err => console.log(err))


    next();

});

module.exports = router;
