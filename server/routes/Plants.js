const express = require('express');
const router = express.Router();

const plantController = require('../controllers/PlantController');
// const interiorController = require('../controllers/InteriorController');

router.get('/:id', plantController.get);
// router.post('/:id/interiors', interiorController.post);

module.exports = router;
