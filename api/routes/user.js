const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/users');

const User = require("../models/user");
const JWT_KEY = "secretkeyforjwt";

router.post('/signup',UserController.user_signup);


router.post('/login',UserController.user_login);


module.exports = router;
