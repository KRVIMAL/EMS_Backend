"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    const secret = process.env.JWT_SECRET;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            if (decoded.userId) {
                req.user = await userModel_1.default.findById(decoded.userId).select("-password");
                next();
            }
            else {
                res.status(401);
                throw new Error("Not authorized, invalid token payload");
            }
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
exports.protect = protect;
