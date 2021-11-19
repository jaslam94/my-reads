const express = require("express");
const router = express.Router();
const { getBooks } = require("../controllers/books");

router.route("/").get(getBooks);

module.exports = router;
