import jwt from "jsonwebtoken";
import {
    setUnauthorized,
    setForbidden,
    setInternalServerError,
} from "../utils/response-handlers.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return setUnauthorized({ message: "Token missing" }, res);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return setUnauthorized({ message: "Invalid or expired token" }, res);
    }
};

export const authorize = (roles = []) => (req, res, next) => {
    if (!roles.length) return next(); // No specific roles required
    if (!req.user.user || !roles.includes(req.user.user.role)) {
        return setForbidden({ message: "Insufficient permissions" }, res);
    }
    next();
};

// Middleware to verify user-specific details
export const verifyUserAccess = async (req, res, next) => {
    try {
        const { email } = req.user.user;
        const { userEmail } = req.params;

        if (!email || !userEmail) {
            return setForbidden({
                message: "Access denied. User-specific details mismatch.",
            }, res);
        }
        next(); 

    } catch (error) {
        console.error("Error verifying user details:", error.message);
        return setInternalServerError(
            { message: "Error verifying user details" },
            res
        );
    }
};