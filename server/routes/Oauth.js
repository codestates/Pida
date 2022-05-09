const express = require('express');
const router = express.Router();

const oauthController = require('../controllers/OauthController');

router.post('/github', oauthController.githubLogin);
router.post('/kakao', oauthController.kakaoLogin);

module.exports = router;
