const express = require('express');
const router = express.Router();

const plantController = require('../controllers/plantsController');

router.get('/:id', plantController.getInfo);
router.post('/:id/interiors', plantController.post);

module.exports = router;
