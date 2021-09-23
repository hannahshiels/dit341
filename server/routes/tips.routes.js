const express = require('express');
const router = express.Router();
const tipControllers = require('../controllers/tips.controllers');


router.route('/api/tips')
    .get(tipControllers.getAllTips)
    .delete(tipControllers.deleteAllTips)



router.route('/api/gardens/:gardenID/plants/:plantID/tips')
    .get(tipControllers.getAllTipsOnPlant)
    .post(tipControllers.createTipOnPlant)
    .delete(tipControllers.deleteAllTipsOnPlant)

    router.route('/api/gardens/:gardenID/plants/:plantID/tips/:tipID')
    .get(tipControllers.getTip)
    .put(tipControllers.fullyUpdateTip)
    .patch(tipControllers.partialUpdateTip)
    .delete(tipControllers.deleteTip)


module.exports = router;