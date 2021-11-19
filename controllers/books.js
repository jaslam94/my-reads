exports.getBooks = (req, res, next) => {
  res.send("Get my books");
};
exports.addWantToRead = (req, res, next) => {
  res.send("Add to want to read books");
};
exports.addRead = (req, res, next) => {
  res.send("Add to read books");
};
exports.delBook = (req, res, next) => {
  res.send("Del book");
};
