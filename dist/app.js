"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const db_js_1 = __importDefault(require("./config/db.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, db_js_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/users", userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API Working with /api/v2");
});
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log({ port });
    console.log(`Server is working  http://localhost:${port}`);
});
