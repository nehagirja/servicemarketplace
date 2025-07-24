import express from "express";
import * as userController from "../controllers/user-controller.js";
import { authorize,authenticate } from "../middleware/auth-middleware.js";
const router = express.Router();

// Route for creating and fetching all users
router.route('/')
    .post(userController.createUser)
    .get(authenticate, userController.getAllUsers);

// Route for fetching, updating, partially updating, and deleting a user by ID
router.route('/:id')
    .get(authenticate,userController.getUserById)
    .put(authenticate,userController.updateUser)
    .patch(authenticate,userController.partiallyUpdateUser)
    .delete(authenticate,userController.deleteUserById);

// Route for updating the last login date 
router.route('/lastLogin/:id')
    .patch(authenticate,userController.updateLastLogin);

export default router;
