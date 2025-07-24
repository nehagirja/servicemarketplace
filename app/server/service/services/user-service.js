import UsersModel from "../models/users.js";

// Save a new user
export const saveUser = (newUser) => {
    const user = new UsersModel(newUser);
    return user.save();
};

// Find a user by ID
export const findUserById = (id) => {
    return UsersModel.findById(id);
};

export const findUserByEmail = async (email) => {
    return UsersModel.findOne({ email }).select('-profileImage');
};

// Find all Users with parameterized query
export const findAllUsers = (firstName, role, service_type, page, count) => {
    const skip = (page - 1) * count;
    const query = {};

    if (firstName && firstName.trim() !== "") {
        query.firstName = { $regex: new RegExp(firstName.trim(), 'i') };
    }

    if (role && role.trim() !== "") {
        query.role = role.trim(); // Match exact role
    }

    if (role && role.trim() !== "") {
        query.service_type = service_type.trim(); // Match exact role
    }

    return UsersModel.find(query).skip(skip).limit(count);
};

// Count users by first name
export const getTotalUsersCount = (firstName) => {
    const query = firstName && firstName.trim() !== "" ? { firstName } : {};
    return UsersModel.countDocuments(query);
};

// Update an entire user record
export const updateUser = (id, updatedData) => {
    return UsersModel.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
};

// Partially update a user's data
export const updatePartialUser = async (id, updateData) => {
    return UsersModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );
};

// Delete a user by ID
export const deleteUserById = (id) => {
    return UsersModel.findByIdAndDelete(id);
};
