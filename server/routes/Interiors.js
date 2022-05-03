const express = require('express');
const router = express.Router();

const interiorController = require('../controllers/InteriorController');
const likeController = require('../controllers/LikeController');
const commentController = require('../controllers/CommentController');
const isAuth = require('../middlewares/Authentication');
const imageHandler = require('../middlewares/imageHandler');
const { post } = require('../middlewares/imageHandler');

//게시글 조회
router.get('/:id', isAuth, interiorController.get);
//수정
router.patch(
  '/:id',
  isAuth,
  post.single('image'),
  interiorController.patch,
  imageHandler.delete,
);
//삭제
router.delete('/:id', isAuth, interiorController.delete, imageHandler.delete);

//좋아요
router.post('/:id/likes', isAuth, likeController.post);
router.delete('/:id/likes', isAuth, likeController.delete);

//댓글 작성
router.post('/:id/comments', isAuth, commentController.post);

module.exports = router;
