const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const mainRoutes = require('./main.routes');

router.use('/', authRoutes);
router.use('/', mainRoutes);

module.exports = router;
