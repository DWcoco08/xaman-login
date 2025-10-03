const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');
const { isAuthenticated } = require('../middleware/auth.middleware');

router.get('/dashboard', isAuthenticated, mainController.showDashboard);
router.get('/mynfts', isAuthenticated, mainController.showMyNFTs);
router.get('/create', isAuthenticated, mainController.showCreate);

module.exports = router;
