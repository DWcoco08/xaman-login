const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { isNotAuthenticated } = require('../middleware/auth.middleware');

router.get('/', isNotAuthenticated, authController.showLogin);
router.post('/api/auth/login', authController.createLoginPayload);
router.post('/api/auth/verify/:uuid', authController.verifyPayload);
router.get('/logout', authController.logout);

module.exports = router;
