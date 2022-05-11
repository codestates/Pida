const express = require('express');
const router = express.Router();

const signupRouter = require('./Signup');
const userController = require('../controllers/User/Index');
const authController = require('../controllers/Auth/Index');
const isAuth = require('../middlewares/Authentication');

//유저 CRUD
router.use('/signup', signupRouter);
router.get('/', isAuth, userController.getInfo);
router.patch('/nickname', isAuth, userController.editNickname);
router.patch('/password', isAuth, userController.editPassword);
router.delete('/', isAuth, userController.withdraw);

//인증
router.post('/login', authController.login);
router.post('/logout', isAuth, authController.logout);

module.exports = router;
