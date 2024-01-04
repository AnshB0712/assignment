const router = require("express").Router();

const { userLogin } = require("../../controllers/auth/login");
const { userRegister } = require("../../controllers/auth/register");

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
