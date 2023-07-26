const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../multer');
const userController = require('../controllers/userController');

router.route('/create-user', upload).post(userController.userCreate);

module.exports = router;
