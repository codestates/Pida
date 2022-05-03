const express = require('express');
const router = express.Router();

const searchController = require('../controllers/SearchController');

router.get('/', searchController.get);
router.get('/all', searchController.getAll);

module.exports = router;
