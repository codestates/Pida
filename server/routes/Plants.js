const express = require('express');
const router = express.Router();

const plantController = require('../controllers/PlantController');
const interiorController = require('../controllers/InteriorController');
const isAuth = require('../middlewares/Authentication');
const { post } = require('../middlewares/imageHandler');

//식물 상세정보 조회
router.get('/:id', plantController.get);

//게시글 작성
router.post(
  '/:id/interiors',
  isAuth,
  post.single('image'), //클라 단에서 설정한 폼데이터의 키 이름 쓴다
  interiorController.post,
);

module.exports = router;
