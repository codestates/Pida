const express = require('express');
const router = express.Router();

// const mypageController = require('../controllers/MypageController');
const userManageController = require('../controllers/UserManageController');

//마이페이지: mypagecontroller
// router.get('/', mypageController.getUserInfo);
// router.delete('/', mypageController.deleteUserInfo);
// router.patch('/', mypageController.patchUserInfo);

//회원가입, 로그인, 로그아웃: authcontroller
router.post('/signup', userManageController.signup);
router.post('/login', userManageController.login);
router.post('/logout', userManageController.logout);

module.exports = router;
