const express = require('express');
const router = express.Router();

const interiorController = require('../controllers/Interior/Index');
const likeController = require('../controllers/Like/Index');
const commentController = require('../controllers/Comment/Index');
const isAuth = require('../middlewares/Authentication');
const interiorImageHandler = require('../middlewares/InteriorImageHandler');
const { interiorPost } = require('../middlewares/InteriorImageHandler');

//게시글 조회
router.get('/:id', isAuth, interiorController.get);
//수정
router.patch(
  '/:id',
  isAuth,
  interiorPost.single('image'),
  interiorController.patch,
  interiorImageHandler.delete,
);
//삭제
router.delete(
  '/:id',
  isAuth,
  interiorController.delete,
  interiorImageHandler.delete,
);

//좋아요
router.post('/:id/likes', isAuth, likeController.post);
router.delete('/:id/likes', isAuth, likeController.delete);

//댓글 작성
router.post('/:id/comments', isAuth, commentController.post);

module.exports = router;
