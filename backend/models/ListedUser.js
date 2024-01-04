const mongoose = require("mongoose");

const ListedUser = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Please provide E-mail"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    phone: {
      type: String,
      required: [true, "Please provide Phone Number"],
      minlength: 10,
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v);
        },
        message: "Please enter a valid PhoneNumber",
      },
    },
    address: {
      type: String,
      required: [true, "Please provide Address"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ListedUser", ListedUser);
