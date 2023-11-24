const express = require('express');
const testController = require('../controllers/testController');
const userAuth = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/', userAuth, testController)

module.exports = router