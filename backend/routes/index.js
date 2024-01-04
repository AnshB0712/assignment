const router = require("express").Router();
const { verifyJWT } = require("../middlewares/verifyJWT");

router.use("/auth", require("./auth"));
router.use("/public", require("./public"));
router.use("/user", verifyJWT, require("./user"));

module.exports = { appRouter: router };
