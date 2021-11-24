const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

exports.auth = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });

  let user = await User.findOne({ email: email });
  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password.",
    });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(404).json({
      success: false,
      message: "Invalid email or password.",
    });

  const token = user.generateAuthToken();
  return res.status(200).json({
    success: true,
    token: token,
  });
};

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}
