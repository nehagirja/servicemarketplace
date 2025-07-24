import * as UserService from "../services/user-service.js";
import * as Validations from "../utils/validations.js";
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
import { checkValidObjectId } from '../utils/validations.js';
 
// Save a new user
export const createUser = async (req, res) => {
    try {
        const newUser = req.body;
 
        if (!newUser.firstName || !newUser.email) {
            return setBadRequest(new Error('First name and email are required'), res);
        }
 
        // Check if email already exists
        const existingUser = await UserService.findUserByEmail(newUser.email);
        if (existingUser) {
            return setConflict(new Error('Email already exists'), res);
        }
 
        const savedUser = await UserService.saveUser(newUser);
        const responseData = {
            user_id: savedUser._id,
            email: savedUser.email,
            firstname: savedUser.firstName,
            lastname: savedUser.lastName,
            phone_number: savedUser.phoneNumber,
            address: savedUser.address,
            pin: savedUser.pin,
            state: savedUser.state,
            country: savedUser.country,
            role: savedUser.role,
            hourly_rate: savedUser.hourly_rate,
            service_type: savedUser.service_type,
            business_name: savedUser.business_name,
            created_at: savedUser.createdAt,
            last_login: savedUser.lastLogin,
            profileImage: savedUser.profileImage
        };
        setResourceCreated(responseData, "User created successfully", res);
    } catch (error) {
        setError(error, res);
    }
};
 
// Find a user by ID
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
 
        // Check if the ID is valid
        const isValidId = checkValidObjectId(userId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid User ID format"), res);
        }
 
        const user = await UserService.findUserById(userId);
 
        if (user) {
            const responseData = {
                user_id: user._id,
                email: user.email,
                firstname: user.firstName,
                lastname: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                pin: user.pin,
                state: user.state,
                country: user.country,
                role: user.role,
                hourly_rate: user.hourly_rate,
                service_type: user.service_type,
                business_name: user.business_name,
                created_at: user.createdAt,
                last_login: user.lastLogin,
                profileImage: user.profileImage
            };
            setSuccess(responseData, null, res);
        } else {
            return setNotFound(new Error("User not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};
 
// Find users by first name
export const getAllUsers = async (req, res) => {
    // console.log("Get users by first name hit");
    try {
        // const token = Validations.getTokenFromHeader(req);
        // if(!token){
        //     return setUnauthorized({ message: "Token missing" }, res);
        // }
        // const isValidUser = Validations.decodeJWT(token);
        // if (!isValidUser) {
        //     return setBadRequest(new Error("Invalid token or user verification failed."), res);
        // }
        const firstName = req.query.firstName || "";
        const role = req.query.role || "";
        const service_type = req.query.service_type || "";
        const page = parseInt(req.query.page) || 1;
        const count = parseInt(req.query.count) || 10;
        const users = await UserService.findAllUsers(firstName, role , service_type, page, count);
        // if (users.length === 0) {
        //     return setNotFound(new Error("No users found with the provided firstname"), res);
        // }
        const totalItems = await UserService.getTotalUsersCount(firstName);
        const totalPages = Math.ceil(totalItems / count);
 
        const items = users.map(user => ({
            user_id: user._id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            pin: user.pin,
            state: user.state,
            country: user.country,
            role: user.role,
            hourly_rate: user.hourly_rate,
            service_type: user.service_type,
            business_name: user.business_name,
            created_at: user.createdAt,
            last_login: user.lastLogin,
            profileImage: user.profileImage
        }));
 
        const responseData = {
            metadata: {
                total_items: totalItems,
                total_pages: totalPages,
                current_page: page
            },
            items: items
        };
 
        setSuccess(responseData, null, res);
    } catch (error) {
        setError(error, res);
    }
};
 
// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
 
        // Excluding createdAt and lastLogin during update as it is a DB metric
        const { createdAt, lastLogin, ...updatedData } = req.body;
 
        // Check if the ID is valid
        const isValidId = checkValidObjectId(userId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid User ID format"), res);
        }
 
        if (!updatedData.firstName || !updatedData.email) {
            return setBadRequest(new Error('First name and email are required'), res);
        }
 
        const updatedUser = await UserService.updateUser(userId, updatedData);
        if (!updatedUser) {
            return setNotFound(new Error('User not found'), res);
        }
 
        setSuccess(updatedUser, "User details updated Successfully", res);
    } catch (error) {
        setError(error, res);
    }
};
 
// Partially update a user by ID
export const partiallyUpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const partialData = req.body;
 
        // Check if the ID is valid
        const isValidId = checkValidObjectId(userId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid User ID format"), res);
        }
 
        // Prevent updates to the createdDate field
        if ('createdDate' in partialData) {
            delete partialData.createdDate;
        }
 
        const updatedUser = await UserService.updatePartialUser(userId, partialData);
        setSuccess(updatedUser, "User details updated Successfully", res);
    } catch (error) {
        setError(error, res);
    }
};
 
// Update only the lastLogin field of a user by ID
export const updateLastLogin = async (req, res) => {
    try {
        const userId = req.params.id;
        // Check if the ID is valid
        const isValidId = checkValidObjectId(userId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid User ID format"), res);
        }
 
        const updatedUser = await UserService.updatePartialUser(userId, { lastLogin: new Date() });
        if (!updatedUser) {
            return setNotFound(new Error("User not found"), res);
        }
 
        setSuccess(updatedUser, null, res);
    } catch (error) {
        setError(error, res);
    }
};
 
// Delete a user by ID
export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        // Check if the ID is valid
        const isValidId = checkValidObjectId(userId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid User ID format"), res);
        }
        const deletedUser = await UserService.deleteUserById(userId);
        if (deletedUser) {
            setSuccess(null,"User deleted successfully", res);
        } else {
            return setNotFound(new Error("User not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};
 