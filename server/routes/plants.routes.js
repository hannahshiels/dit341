const express = require('express');
const plantControllers = require('../controllers/plants.controllers')
const router = express.Router();

router.route('/api/gardens/:gardenID/plants')
    .get(plantControllers.getAllPlantsInGarden)
    .post(plantControllers.createPlantInGarden)
    .delete(plantControllers.deleteAllPlantsInGarden)

router.route('/api/gardens/:gardenID/plants/:plantID')
    .get(plantControllers.getPlant)
    .put(plantControllers.fullyUpdatePlant)
    .patch(plantControllers.partialUpdatePlant)
    .delete(plantControllers.deletePlant)

module.exports = router;