const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_route');
router.get('/profile',userController.user);
// router for signup routes
router.get('/sign-up',userController.signup);

//route for signin routes
router.get('/sign-in',userController.signin);

router.post('/create',userController.create);
router.post('/create-session',userController.createSession);

module.exports= router;