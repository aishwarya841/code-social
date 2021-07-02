const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_route');

//to use passport as a middleware here
const passport = require('passport');

router.get('/profile',passport.checkAuthentication,userController.user);

router.get('/personal-profile/:id',passport.checkAuthentication,userController.profile);
// router for signup routes
router.get('/sign-up',userController.signup);

//route for signin routes
router.get('/sign-in',userController.signin);

router.post('/create',userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/user/sign-in'},
    ),userController.createSession
);

router.get('/sign-out', userController.destroySession);

//router.post('/post-comment',userController.createContent);

module.exports= router;