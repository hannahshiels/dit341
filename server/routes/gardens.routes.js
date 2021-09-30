const express = require('express');
const router = express.Router();
const gardenControllers = require('../controllers/gardens.controllers')


router.route('/api/users/:userID/gardens')
    .get(gardenControllers.getUserGardens)
    .post(gardenControllers.createUserGarden)
    .delete(gardenControllers.deleteUserGardens)

router.route('/api/users/:userID/gardens/:gardenID')
    .get(gardenControllers.getGarden)
    .put(gardenControllers.fullyUpdateGarden)
    .patch(gardenControllers.partialUpdateGarden)
    .delete(gardenControllers.deleteGarden)

router.route('/api/gardens')
    .get(gardenControllers.getAllGardens)
    .post(gardenControllers.createGarden)

router.route('/api/gardens/:gardenID')
    .get(gardenControllers.getGarden)
    .put(gardenControllers.fullyUpdateGarden)
    .patch(gardenControllers.partialUpdateGarden)
    .delete(gardenControllers.deleteGarden)

module.exports = router;