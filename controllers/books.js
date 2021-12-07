const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

exports.getBookById = async (req, res, next) => {
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

exports.getMyBooks = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });

    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      req.user = decoded;
    } catch (ex) {
      res.status(400).send({ success: false, message: "Invalid token." });
    }

    const { user } = req;

    const book = await Book.where("user.email").eq(user.email);

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
    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};

exports.addBook = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "The request does not contain data!",
      });
    }

    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });

    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      req.user = decoded;
    } catch (ex) {
      res.status(400).send({ success: false, message: "Invalid token." });
    }

    const { user } = req;

    const bookToAdd = req.body;

    const book = await Book.findOne({
      $and: [{ key: bookToAdd.key }, { "user.email": user.email }],
    });

    if (book) {
      return res.status(400).json({
        success: false,
        message: "Book already exists!",
      });
    }

    const newBook = await Book.create(bookToAdd);

    return res.status(201).json({
      success: true,
      data: newBook,
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

    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });

    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      req.user = decoded;
    } catch (ex) {
      res.status(400).send({ success: false, message: "Invalid token." });
    }

    const { user } = req;

    const book = await Book.findOne({
      $and: [{ _id: id }, { "user.email": user.email }],
    });

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
