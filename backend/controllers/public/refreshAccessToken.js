const JWT = require("jsonwebtoken");
const { CustomAPIError } = require("../../errors/customError");
const { StatusCodes } = require("http-status-codes");
const {
  REFRESH_SECRET,
  TOKEN_SECRET,
  ACCESS_TOKEN_EXP,
} = require("../../constants");
const User = require("../../models/User");

const refreshToken = async (req, res) => {
  const { refresh } = req.cookies;

  let decodedToken;
  let targetUser;
  let ACCESS_TOKEN;

  if (!refresh) {
    throw new CustomAPIError(
      "No Token Found, Please Login/SignUp.",
      StatusCodes.BAD_REQUEST
    );
  }

  JWT.verify(refresh, REFRESH_SECRET, (err, decode) => {
    if (err) {
      throw new CustomAPIError("Token is expired", StatusCodes.BAD_REQUEST);
    }
    decodedToken = decode;
  });

  targetUser = await User.findOne({ _id: decodedToken.user_id });
  ACCESS_TOKEN = JWT.sign(
    {
      user_id: targetUser._id,
    },
    TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXP }
  );

  if (!targetUser)
    throw new CustomAPIError(
      "No User Found, Please Login/SignUp Again.",
      StatusCodes.BAD_REQUEST
    );

  res
    .status(200)
    .json({ message: "New Token Generated!", token: ACCESS_TOKEN });
};

module.exports = { refreshToken };
