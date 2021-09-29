const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers')

router.route('/api/login')
    .post(authController.login)

router.route('/api/logout')
    .get(authController.logOut);


module.exports = router;