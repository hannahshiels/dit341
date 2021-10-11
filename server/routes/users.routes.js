const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.controllers')
const checkAuth = require('../middleware/checkAuth');

router.route('/api/users')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser)
    .delete(userControllers.deleteUsers)

router.route('/api/users/:userID')
    .get(userControllers.getUser)
    .put(checkAuth,userControllers.fullyUpdateUser)
    .patch(checkAuth,userControllers.partialUpdateUser)
    .delete(checkAuth,userControllers.deleteUser)

module.exports = router;