"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURL = process.env.MONGO_URL;
const connectDb = async () => {
    try {
        const conn = await mongoose_1.default.connect(mongoURL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDb;
