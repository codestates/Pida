const express = require('express');
const router = express.Router();

const userController = require('../controllers/user/Index');

//회원가입
router.post('/', userController.signup);
router.post('/email', userController.getEmailCode);
router.post('/emailauth', userController.verifyEmailCode);
router.post('/nickname', userController.checkNickname);

module.exports = router;
