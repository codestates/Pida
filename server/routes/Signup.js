const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

//유저 회원가입 및 이메일 닉네임 중복 체크
router.post('/', userController.signup);
router.get('/email', userController.checkEmail);
router.patch('/nickname', userController.checkNickname);

module.exports = router;
