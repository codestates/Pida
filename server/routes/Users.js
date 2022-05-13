const express = require('express');
const router = express.Router();

const signupRouter = require('./Signup');
const userController = require('../controllers/user/Index');
const authController = require('../controllers/auth/Index');
const isAuth = require('../middlewares/Authentication');

//사용자 회원가입, 정보 조회, 수정, 탈퇴
router.use('/signup', signupRouter);
router.get('/', isAuth, userController.getInfo);
router.patch('/nickname', isAuth, userController.editNickname);
router.patch('/password', isAuth, userController.editPassword);
router.delete('/', isAuth, userController.withdraw);

//인증
router.post('/login', authController.login);
router.post('/logout', isAuth, authController.logout);

module.exports = router;
