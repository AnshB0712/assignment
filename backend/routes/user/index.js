const router = require("express").Router();

const CRUD = require("../../controllers/user");

router.get("/get", CRUD.getListedUser);
router.get("/get/:id", CRUD.getSingleUser);
router.post("/add", CRUD.addListedUser);
router.patch("/update", CRUD.updateListedUser);
router.delete("/delete/:id", CRUD.deleteListedUser);

module.exports = router;
