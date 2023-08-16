var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', async(req, res, next) => {
      const users = await User.find();
      res.status(200).json(users);
});

router.post('/', async(req, res) => {
  try{
      const user = await User.create(req.body);
      res.status(200).json(user);
  } catch(err){
      console.log(err.message);
      res.status(500).json({message: err.message})
  }
})

module.exports = router;
