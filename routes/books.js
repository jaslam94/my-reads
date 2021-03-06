const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getBookById,
  getReadsByType,
  getMyBooks,
  addBook,
  delBook,
} = require("../controllers/books");

router.all("*", auth);

router.route("/").post(addBook);

router.route("/my").get(getMyBooks);

router.route("/:id").get(getBookById).delete(delBook);

router.route("/my/:type").get(getReadsByType);

module.exports = router;
