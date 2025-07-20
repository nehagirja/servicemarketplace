import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import UsersModel from '../models/users.js';
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

export const checkValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  return true;
}

export const verifyUserDetails = async (userDetails) => {
  try {
    console.log("Userdetails", userDetails);
    const { firstName, email, role } = userDetails;
    console.log("email ", email);
    const user = await UsersModel.findOne({ email });

    if (!user) {
      throw new Error("User not found or details do not match");
    }

    return !!user;
  } catch (error) {
    console.error("Error verifying user details:", error.message);
    throw error; // Re-throw the error to handle it at a higher level
  }
};

export const decodeJWT = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userDetails = {
      firstName: decoded.user.firstName,
      lastName: decoded.user.lastName,
      email: decoded.user.email,
      role: decoded.user.role,
    };
    const verifiedUser = await verifyUserDetails(userDetails);

    return verifiedUser;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    // throw new Error("Invalid token");
  }
};

export const getTokenFromHeader = (req) => {
  try {
    const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new Error("Authorization token is missing or malformed");
    // }
    const token = authHeader.split(' ')[1];
    return token;
  } catch (error) {
    throw new Error("Invalid token");
  }
}