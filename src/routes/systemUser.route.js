const express = require("express");
const router = express.Router();
const systemUser = require('../controllers/systemUser.controller')


router.post('/signup', systemUser.signUp);

router.post('/login', systemUser.login);


module.exports = router;