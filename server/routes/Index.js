const express = require('express');
const router = express.Router();

const usersRouter = require('./Users');
const oauthRouter = require('./OAuth');
const plantsRouter = require('./Plants');
const interiorsRouter = require('./Interiors');
const commentsRouter = require('./Comments');
const searchController = require('../controllers/Search');

//페이지가 아닌 기능 기준으로 라우터 분기해 두었음.
router.use('/users', usersRouter);
router.use('/oauth', oauthRouter);
router.use('/plants', plantsRouter);
router.use('/interiors', interiorsRouter);
router.use('/comments', commentsRouter);
router.get('/search', searchController.get);

module.exports = router;
