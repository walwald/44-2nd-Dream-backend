const express = require('express');

const userController = require('../controllers/userController');
const checkLogInToken = require('../utils/auth');

const router = express.Router();

router.post('/kakaologin', userController.signInKakao);
router.get('/userInfo', checkLogInToken, userController.getUserById);
router.post('/address', checkLogInToken, userController.inputAddress);
router.get('/address', checkLogInToken, userController.addressByUserId);
module.exports = { router };
