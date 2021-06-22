const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_route');

router.post('/post-comment',postController.createContent);
module.exports= router;

