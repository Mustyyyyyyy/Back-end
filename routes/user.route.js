const express = require('express');
const router = express.Router();
const { getSignup, postRegister, getSignIn, getDashboard, postLogin } = require('../controllers/user.controller');
// const userModel = require('../models/user.model');

router.post('/register', postRegister);

router.get('/signup', getSignup);

router.post('/login', postLogin);

router.get('/signin', getSignIn);

router.get("/dashboard", getDashboard);

module.exports = router; 