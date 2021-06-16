const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_route');
router.get('/',homeController.home);
router.use('/user',require('./profile'));

module.exports = router;
