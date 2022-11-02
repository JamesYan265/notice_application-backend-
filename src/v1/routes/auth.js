const router = require("express").Router();
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

//Use Register API
router.post("/register", 
//express-validator 輸入Checking 
body("username").isLength({min:8}).withMessage("The username must have at least 8 characters."),
body("password").isLength({min:8}).withMessage("The Password must have at least 8 characters"),
body("confirmPassword").isLength({min:8}).withMessage("The Password must have at least 8 characters"),
//檢查MongoDB username是否已被使用
body("username").custom((value) => {
    return User.findOne({username: value}).then((user) => {
        if(user) {
            return Promise.reject("This username is already taken")
        }
    });
}),
//當輸入不被準許
validation.vaildate,
// User Register Controller
userController.register
);

//User Login API
router.post("/login", 
body("username").isLength({min:8}).withMessage("The username must have at least 8 characters."),
body("password").isLength({min:8}).withMessage("The password must have at least 8 characters."),
validation.vaildate,
userController.login
);

//JWT是否過期的認證API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
    return res.status(200).json({ user : req.user });
});

module.exports = router;