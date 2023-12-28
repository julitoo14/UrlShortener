const express = require('express');

const router = express.Router();
const urlController = require('../controllers/url');

router.get('/:id', urlController.getUrl);
router.post('/api/shorten', urlController.postUrl);
router.get('/api/metrics/:id', urlController.getMetrics);

module.exports = router;