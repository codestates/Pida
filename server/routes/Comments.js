const express = require('express');
const router = express.Router();

const commentController = require('../controllers/Comment/Index');
const isAuth = require('../middlewares/Authentication');

//댓글 수정 삭제
router.patch('/:id', isAuth, commentController.patch);
router.delete('/:id', isAuth, commentController.delete);

module.exports = router;
