const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    let { fullName: name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
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

exports.addGoogleUser = async (req, res, next) => {
  try {
    let { fullName: name, email } = req.body;

    const user = await User.create({
      name,
      email,
      signInProvider: "google.com",
    });

    return res.status(201).json({
      success: true,
      data: user,
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
