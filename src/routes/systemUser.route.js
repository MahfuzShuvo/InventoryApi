const express = require("express");
const Authguard = require("../../middleware/auth.guard");
const router = express.Router();
const systemUser = require('../controllers/systemUser.controller')


router.post('/signup', systemUser.signUp);

router.post('/login', systemUser.login);

router.put('/edit', Authguard, systemUser.editSystemUser);


module.exports = router;