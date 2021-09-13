const express = require('express');
const Tip = require('../models/tip');
const Plant = require('../models/plant');
const router = express.Router();


router.route('/api/gardens/:gardenID/plants/:plantID/tips')
    .get((req,res) => {
        // View all tips within a plant within a garden
    })
    .post((req,res)=> {
        // Create a new tip within a plant within a garden
    })
    .delete((req,res)=> {
        // Delete all tips within a plant within a garden
    })

    router.route('/api/gardens/:gardenID/plants/:plantID/tips/:tipsID')
    .get((req,res) => {
        // View a tip within a plant within a garden
    })
    .put((req,res) => {
        // Update a tip within a plant within a garden
    })
    .patch((req,res) => {
        // Partially update a tip within a plant within a garden
    })
    .delete((req,res)=> {
        // Delete a tip within a plant within a garden
    })


module.exports = router;