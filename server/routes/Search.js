const express = require('express');
const router = express.Router();

const searchController = require('../controllers/SearchController');

//유저 회원가입 및 이메일 닉네임 중복 체크
router.get('/', searchController.get);
// router.get('/all', searchController.getAll);

module.exports = router;
