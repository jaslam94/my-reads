const express = require("express");
const router = express.Router();
const {
  getBooks,
  getReadsByType,
  addBook,
  delBook,
} = require("../controllers/books");

router.route("/").post(addBook);
router.route("/:id").get(getBooks).delete(delBook);
router.route("/my/:type").get(getReadsByType);

module.exports = router;
