"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddlerware_1 = require("../middlewares/authMiddlerware");
const router = express_1.default.Router();
router.post("/", userController_1.registerUser);
router.post("/auth", userController_1.authUser);
router.post("/logout", userController_1.logoutUser);
router
    .route("/profile")
    .get(authMiddlerware_1.protect, userController_1.getUserProfile)
    .put(authMiddlerware_1.protect, userController_1.updateUserProfile);
exports.default = router;
