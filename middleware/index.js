var express = require("express");
var auth = require("./auth");
var router = express.Router();

// daftar registration
router.post("/api/v1/register", auth.registrasi);

// daftar login
router.post("/api/v1/login", auth.login);

module.exports = router;
