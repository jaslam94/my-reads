const express = require("express");
const router = express.Router();
const { getUser, addUser } = require("../controllers/users");

router.route("/:id").get(getUser);
router.route("/add").post(addUser);

module.exports = router;
