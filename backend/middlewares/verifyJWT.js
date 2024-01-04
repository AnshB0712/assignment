const JWT = require("jsonwebtoken");
const { CustomAPIError } = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");
const { TOKEN_SECRET } = require("../constants");

const verifyJWT = (req, _, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token)
    throw new CustomAPIError(
      "Token is not present, Please login/signup!",
      StatusCodes.UNAUTHORIZED
    );

  JWT.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err)
      throw new CustomAPIError("Token is Expired.", StatusCodes.FORBIDDEN);

    req.user = { ...decoded };
    next();
  });
};

module.exports = { verifyJWT };
