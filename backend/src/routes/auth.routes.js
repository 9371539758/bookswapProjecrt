const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../controllers/user.controller");
// auth controllers
authRouter.post("/register", register);
authRouter.post("/login",login);

module.exports = authRouter;
