var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.getUsers);

/* ADD new user. */
router.post('/', userController.addUser);

module.exports = router;
