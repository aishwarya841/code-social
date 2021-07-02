const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment_route');

router.post('/create',commentController.createComment);
router.get('/delete/:id',commentController.deleteComment);

module.exports = router;