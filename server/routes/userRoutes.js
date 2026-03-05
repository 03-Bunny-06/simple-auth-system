const { Router } = require("express");
const router = Router();
const signUpController = require("../controller/userController");

router.post('/signup', signUpController);

module.exports = router;