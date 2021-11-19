const express = require("express");
const router = express.Router();
const {
  getBooks,
  addWantToRead,
  addRead,
  delBook,
} = require("../controllers/books");

router.route("/").get(getBooks);
router.route("/wanttoread").post(addWantToRead);
router.route("/read").post(addRead);
router.route("/").delete(delBook);

module.exports = router;
