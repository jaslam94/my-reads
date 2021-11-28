const Book = require("../models/book");

exports.getBooks = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};

exports.getReadsByType = async (req, res, next) => {
  try {
    const { type } = req.params;

    const books = await Book.where("type").eq(type);

    if (!books) {
      return res.status(404).json({
        success: false,
        message: "Not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((m) => m.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};

exports.delBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Not found!",
      });
    }

    await book.deleteOne();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};
