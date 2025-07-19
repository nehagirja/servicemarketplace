import * as authService from "../services/auth-service.js";
import * as userService from "../services/user-service.js";
import {
    setSuccess,
    setError,
    setBadRequest,
    setUnauthorized,
    setForbidden,
    setInternalServerError,
    setConflict,
    setResourceCreated,
    setNotFound
} from "../utils/response-handlers.js";

// Send Magic Link
export const sendMagicLink = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
    }

    try {
        const magicLink = await authService.generateMagicLink(email);
        res.status(200).json({ success: true, message: "Magic link sent successfully.", magicLink });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

export const login = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return setBadRequest(new Error('Email is required'), res);
        }

        const existingUser = await userService.findUserByEmail(email);
        if (!existingUser) {
            return setNotFound(new Error("Email doesn't exist"), res);
        }
        const magicLink = await authService.generateMagicLink2(existingUser, req); 
        setSuccess(magicLink, null, res);
    } catch (error) {
        setError(error, res);
    }
};

export const getUserDataFromToken = async (req, res) => {
    try {
        // Retrieve the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return setBadRequest(new Error('Authorization token is required'), res);
        }

        const token = authHeader.split(' ')[1]; // Extract the token
        if (!token) {
            return setBadRequest(new Error('Invalid token format'), res);
        }

        // Verify and decode the token
        const decoded = await authService.verifyMagicLink(token);
        if (!decoded) {
            return setBadRequest(new Error('Invalid or expired token'), res);
        }

        // Return the decoded data directly
        setSuccess(decoded, null, res);
    } catch (error) {
        setUnauthorized(error, res);
    }
};

// Verify Magic Link
/*
export const verifyMagicLink = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ success: false, message: "Token is required." });
    }

    try {
        const user = await authService.verifyMagicLink(token);
        res.status(200).json({ success: true, message: "Magic link verified successfully.", user });
    } catch (error) {
        res.status(401).json({ success: false, message: `Error: ${error.message}` });
    }
};
*/
