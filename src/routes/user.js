var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/get-users', userController.getUsers);

/* POST add new user. */
router.post('/add-user', userController.postAddUser);

/* POST edit user by ID. */
router.post('/update-user-by-id/:userId', userController.postEditUser);

/* GET find user by ID. */
router.get('/get-user-by-id/:userId', userController.findById);

module.exports = router;
