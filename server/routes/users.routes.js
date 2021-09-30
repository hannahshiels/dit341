const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.controllers')
const checkAuth = require('../middleware/checkAuth');

router.route('/api/users')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser)
    .delete(userControllers.deleteUsers)

router.route('/api/users/:userID')
    .get(checkAuth, userControllers.getUser)
    .put(userControllers.fullyUpdateUser)
    .patch(userControllers.partialUpdateUser)
    .delete(userControllers.deleteUser)

module.exports = router;