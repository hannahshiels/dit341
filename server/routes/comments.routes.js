const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/comments.controllers');

router.route('/api/comments')
.get(commentControllers.getAllComments)

.delete(commentControllers.deleteAllComments)


router.route('/api/users/:userID/ads/:adID/comments')
.get(commentControllers.getAllCommentsOnAd)

.post(commentControllers.createComment)

.delete(commentControllers.deleteAllCommentsOnAd)


router.route('/api/users/:userID/ads/:adID/comments/:commentID')
.get(commentControllers.getComment)

.put(commentControllers.fullyUpdateComment)

.patch(commentControllers.partialUpdateComment)

.delete(commentControllers.deleteComment)

module.exports = router;