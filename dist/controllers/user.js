"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const user_js_1 = require("../models/user.js");
const newUser = async (req, res, next) => {
    try {
        console.log("name");
        const { name, email, photo, gender, _id, dob } = req.body;
        console.log({ name, email, photo, gender, _id, dob });
        const user = await user_js_1.User.create({});
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`
        });
    }
    catch (error) {
        return res.status(200).json({
            success: false,
            message: error,
        });
    }
};
exports.newUser = newUser;
