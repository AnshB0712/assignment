require("express-async-errors");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const { initiateServer } = require("./utils/initiatServer");
const { CustomAPIError } = require("./errors/customError");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// For console the upcoming requests
app.use((req, res, next) => {
  const info = req.method + " " + req.url;
  console.log("API HIT -------------->", info, "\n|\nv\n|\n");
  next();
});

// Require base route file
const { appRouter } = require("./routes");

// Routes Api ----------> {{BASE_URL}}/v1...
app.use("/v1", appRouter);

// For invalid routes
app.all("*", (req, res) => {
  throw new CustomAPIError(`Requested URL ${req.path} not found`, 404);
});

// Error Handler
app.use(errorHandler);

// Initialise the Server
initiateServer(app, 3000);
