const JWT = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../../errors/customError");
const {
  TOKEN_SECRET,
  ACCESS_TOKEN_EXP,
  REFRESH_SECRET,
  REFRESH_TOKEN_EXP,
} = require("../../constants");
const User = require("../../models/User");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError(
      "username and password are required.",
      StatusCodes.BAD_REQUEST
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomAPIError(
      "No admin registered with this username",
      StatusCodes.UNAUTHORIZED
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomAPIError(
      "Password is incorrect.",
      StatusCodes.UNAUTHORIZED
    );
  }

  const ACCESS_TOKEN = JWT.sign(
    {
      user_id: user._id,
    },
    TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXP }
  );

  const REFRESH_TOKEN = JWT.sign(
    {
      user_id: user._id,
    },
    REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXP }
  );

  res.cookie("refresh", REFRESH_TOKEN, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    token: ACCESS_TOKEN,
  });
};

module.exports = { userLogin };
