const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.controllers')

router.route('/api/users')
    .get(userControllers.getAllUsers)
    .post(userControllers.createUser)

router.route('/api/users/:userID')
    .get(userControllers.getUser)
    .put(userControllers.fullyUpdateUser)
    .patch(userControllers.partialUpdateUser)
    .delete(userControllers.deleteUser)

module.exports = router;