const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_route');
const passport = require('passport');

router.post('/post-comment',passport.checkAuthentication,postController.createContent);
router.get('/delete/:id',passport.checkAuthentication,postController.delete);
module.exports= router;

