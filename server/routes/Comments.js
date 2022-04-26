const express = require('express');
const router = express.Router();

const commentController = require('../contollers/CommentController');

//댓글 수정 삭제
router.patch('/:id', commentController.patch);
router.delete('/:id', commentController.delete);

module.exports = router;
