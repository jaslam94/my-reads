const express = require("express");
const router = express.Router();
const { auth, googleAuth } = require("../controllers/auth");

router.route("/login").post(auth);
router.route("/login_g").post(googleAuth);

module.exports = router;
