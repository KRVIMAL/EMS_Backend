"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const userModel_1 = __importDefault(require("../models/userModel"));
// @desc Auth user/set token
// route POST /api/users
// @access Public
const authUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel_1.default.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
exports.authUser = authUser;
const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await userModel_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
exports.registerUser = registerUser;
// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = (0, express_async_handler_1.default)(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Logout User",
    });
});
exports.logoutUser = logoutUser;
// @desc Get user profile
// route POST /api/users/profile
// @access Private
const getUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };
    console.log(req.user);
    res.status(200).json(user);
});
exports.getUserProfile = getUserProfile;
// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        message: "Update user profile",
    });
});
exports.updateUserProfile = updateUserProfile;
