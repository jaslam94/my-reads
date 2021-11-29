const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  key: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Title cannot be empty."],
  },
  authors: {
    type: String,
    trim: true,
  },
  subjects: {
    type: String,
    trim: true,
  },
  firstPublished: {
    type: String,
    trim: true,
  },
  coverUrl: {
    type: String,
    trim: true,
  },
  type: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.Now,
  },
  user: {
    type: new mongoose.Schema({
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      },
    }),
  },
});

module.exports = mongoose.model("Book", bookSchema);
