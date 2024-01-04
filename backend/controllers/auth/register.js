const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../../errors/customError");

const User = require("../../models/User");

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    throw new CustomAPIError(
      "All Fields are required.",
      StatusCodes.BAD_REQUEST
    );
  }

  await User.create({ email, username, password });

  res.status(StatusCodes.CREATED).json({
    msg: "User Registered Successfully",
  });
};

module.exports = { userRegister };
