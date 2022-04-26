const express = require('express');
const router = express.Router();

const usersRouter = require('./Users');
// const searchController = require('../controllers/SearchController');
// const plantsRouter = require('./Plants');
// const interiorsRouter = require('./Interiors');
// const commentsRouter = require('./Comments');

//페이지가 아닌 기능 기준으로 라우터 분기해 두었음.
router.use('/users', usersRouter);
// router.get('/search', searchController);
// router.use('/plants', plantsRouter);
// router.use('/interiors', interiorsRouter);
// router.use('/comments', commentsRouter);

module.exports = router;
