const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const Passport  = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(Passport.authenticate('local',{failureFlash:true, failureRedirect:'/login',keepSessionInfo: true}),users.login)

router.get('/logout',users.logout); 

module.exports = router;