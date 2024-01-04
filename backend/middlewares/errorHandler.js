const { CustomAPIError } = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  if (error.name === "AxiosError") {
    return res
      .status(
        error.response?.data?.responseCode ?? error.response?.data?.status
      )
      .json({ message: error.response?.data?.message });
  }

  console.log(error);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: error.data,
    message: "Something went wrong!" + error.message,
  });
};

module.exports = errorHandler;
