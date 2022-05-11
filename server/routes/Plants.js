const express = require('express');
const router = express.Router();

const plantController = require('../controllers/Plant/Index');
const interiorController = require('../controllers/Interior/Index');
const isAuth = require('../middlewares/Authentication');
const plantImageHandler = require('../middlewares/PlantImageHandler.js');
const { plantPost } = require('../middlewares/PlantImageHandler.js');
const { interiorPost } = require('../middlewares/InteriorImageHandler');

//식물 상세정보 조회
router.get('/:id', plantController.get);

//관리자를 위한 식물 정보 등록, 수정, 삭제(id가 1번인 경우만 접속 허용한다.)
router.post('/', isAuth, plantPost.single('image'), plantController.post);
router.patch(
  '/:id',
  isAuth,
  plantPost.single('image'),
  plantController.patch,
  plantImageHandler.delete,
);
router.delete('/:id', isAuth, plantController.delete, plantImageHandler.delete);

//게시글 작성
router.post(
  '/:id/interiors',
  isAuth,
  interiorPost.single('image'), //클라 단에서 설정한 폼데이터의 키 이름 쓴다
  interiorController.post,
);

module.exports = router;
