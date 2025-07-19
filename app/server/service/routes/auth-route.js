import express from "express";
import * as authenticationController from "./../controllers/auth-controller.js";

const router = express.Router();

router.route("/send").post(authenticationController.sendMagicLink); // Send Magic Link
router.route("/login").post(authenticationController.login) // Login Auth
router.route("/verify").get(authenticationController.getUserDataFromToken) // Verify Token

export default router;