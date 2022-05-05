const express = require('express');
const router = express.Router();

const oauthController = require('../controllers/OauthController');

router.post('/github', oauthController.githubLogin);
// router.post('/naver', oauthController.naverLogin);

module.exports = router;
