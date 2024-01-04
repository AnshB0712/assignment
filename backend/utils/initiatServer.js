const mongoose = require("mongoose");
const { MONGO_URI } = require("../constants");
const initiateServer = async (app, PORT) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected");
    app.listen(PORT, () => console.log("Server Started at " + PORT));
  } catch (error) {
    console.log("Error while Initailizing", error);
  }
};

module.exports = { initiateServer };
