const express = require('express');
const router = express.Router();

const interiorController = require('../controllers/InteriorController');
// const likeController = require('../controllers/LikeContoller');
const commentController = require('../controllers/CommentController');
const isAuth = require('../middlewares/Authentication');

//게시글 조회 수정 삭제
router.get('/:id', isAuth, interiorController.get);
// router.patch('/:id', isAuth, interiorController.patch);
// router.delete('/:id', isAuth, interiorController.delete);

//좋아요
// router.post('/:id/likes', isAuth, likeController.post);
// router.delete('/:id/likes', isAuth, likeController.delete);

// //댓글 작성
router.post('/:id/comments', isAuth, commentController.post);

module.exports = router;
