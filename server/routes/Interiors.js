const express = require('express');
const router = express.Router();

const interiorController = require('../controllers/plantsController');
const likeController = require('../controllers/LikeContoller');
const commentController = require('../contollers/CommentController');

//게시글 조회 수정 삭제
router.get('/:id', interiorController.get);
router.patch('/:id', interiorController.patch);
router.delete('/:id', interiorController.delete);

//좋아요
router.post('/:id/likes', likeController.post);
router.delete('/:id/likes', likeController.delete);

//댓글
router.get('/:id/comments', commentController.get);
router.post('/:id/comments', commentController.post);

module.exports = router;
