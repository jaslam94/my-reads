const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");

exports.auth = async (req, res, next) => {
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

exports.googleAuth = async (req, res, next) => {
  try {
    const { token } = req.body;

    const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE;

    const client = new OAuth2Client(CLIENT_ID_GOOGLE);

    const result = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    });

    const { email } = result.getPayload();

    let user = await User.findOne({ email: email });
    if (!user) {
      user = await User.create({
        email: email,
        signInProvider: "google.com",
      });
    }

    const jwt = user.generateAuthToken();

    return res.status(200).json({
      success: true,
      token: jwt,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error!",
    });
  }
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}
