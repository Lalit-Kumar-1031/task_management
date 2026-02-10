const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const { auth } = require("../middleware/auth");

// This Router for registering user
userRouter.post("/register", userController.postRegister);
userRouter.post("/login", userController.postLogin);
userRouter.post("/refresh", userController.postRefresh);
userRouter.post("/logout", auth, userController.postLogout);
userRouter.get("/user-data", auth, userController.getUserdata);

module.exports = userRouter;
