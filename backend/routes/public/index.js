const { refreshToken } = require("../../controllers/public/refreshAccessToken");

const router = require("express").Router();

router.get("/refresh-token", refreshToken);

module.exports = router;
