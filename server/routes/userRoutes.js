const { Router } = require("express");
const router = Router();
const {signUpController, signInController} = require("../controller/userController");

router.post('/signup', signUpController);
router.post('/signin', signInController);

module.exports = router;