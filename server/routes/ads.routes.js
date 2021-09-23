const express = require('express');
const router = express.Router();
const adControllers = require('../controllers/ads.controllers');

router.route('/api/users/:userID/ads')

.get(adControllers.getUserAds)

.post(adControllers.createUserAd)

.delete(adControllers.deleteUserAds)

router.route('/api/users/:userID/ads/:adID')

.get(adControllers.getUserAd)

.put(adControllers.fullUpdateUserAd)

.patch(adControllers.partialUpdateUserAd)

.delete(adControllers.deleteUserAd)

module.exports = router;