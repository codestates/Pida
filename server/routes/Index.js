const express = require('express');
const router = express.Router();

const usersRouter = require('./Users');
// const searchRouter = require('./Search');
// const plantsRouter = require('./Plants');
// const interiorsRouter = require('./Interiors');

//페이지가 아닌 기능 기준으로 라우터 분기해 두었음.
router.use('/users', usersRouter);
// router.use('/search', searchRouter);
// router.use('/plants', plantsRouter);
// router.use('/interiors', interiorsRouter);

module.exports = router;
