const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../../errors/customError");
const ListedUser = require("../../models/ListedUser");

const addListedUser = async (req, res) => {
  const { username, email, phone, address } = req.body;

  if (!username || !email || !phone || !address) {
    throw new CustomAPIError(
      "username and password are required.",
      StatusCodes.BAD_REQUEST
    );
  }

  await ListedUser.create({ username, email, phone, address });

  res.json({
    status: StatusCodes.OK,
  });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await ListedUser.findById(id);

  res.json({
    status: StatusCodes.OK,
    data: user,
  });
};

const getListedUser = async (req, res) => {
  const users = await ListedUser.find({});

  res.json({
    status: StatusCodes.OK,
    data: users,
  });
};

const updateListedUser = async (req, res) => {
  const { _id, ...data } = req.body;

  if (!_id || Object.keys(data).length === 0) {
    throw new CustomAPIError(
      "Insufficient Data available to make an upadte",
      StatusCodes.BAD_REQUEST
    );
  }

  await ListedUser.findByIdAndUpdate(_id, data);

  res.json({ status: StatusCodes.CREATED });
};

const deleteListedUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomAPIError("ID required", StatusCodes.BAD_REQUEST);
  }

  await ListedUser.findByIdAndDelete(id);

  res.json({ status: StatusCodes.CREATED });
};

module.exports = {
  addListedUser,
  getListedUser,
  getSingleUser,
  updateListedUser,
  deleteListedUser,
};
