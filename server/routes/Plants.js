const express = require('express');
const router = express.Router();

const plantController = require('../controllers/plant/Index');
const interiorController = require('../controllers/interior/Index');
const isAuth = require('../middlewares/Authentication');
const plantImageHandler = require('../middlewares/PlantImageHandler.js');
const { plantPost } = require('../middlewares/PlantImageHandler.js');
const { interiorPost } = require('../middlewares/InteriorImageHandler');

//식물 상세정보 조회
router.get('/:id', plantController.get);

//관리자 식물 정보 등록, 수정, 삭제
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
  interiorPost.single('image'),
  interiorController.post,
);

module.exports = router;
