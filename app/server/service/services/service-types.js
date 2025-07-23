import ServiceTypeModel from "../models/service-types.js"

//Get all the service types 
export const getAllServiceTypes = (serviceType,popular) => {
    const query = {}; // Initialize an empty query object

    if (serviceType && serviceType.trim() !== "") {
        query.role_type = { $regex: new RegExp(serviceType.trim(), 'i') };
    }
    
    if (popular) {
        query.popular = true;
    }
    // Return all service types matching the query
    return ServiceTypeModel.find(query);
};


// Get a single service type by ID
export const getServiceTypeById = (id) => {
    return ServiceTypeModel.findById(id);
}

export const getServiceTypeByRoleType = (roleType) => {
    return ServiceTypeModel.findOne({ service_type: roleType });
};

// Post a new service type
export const createServiceType = (data) => {
    const newServiceType = new ServiceTypeModel(data);
    return newServiceType.save();
};

// Update a service type by ID
export const updateServiceType = (id, updatedData) => {
    return ServiceTypeModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true }
    );
};

// Partially update a service type by ID
export const updatePartialServiceType = (id, partialData) => {
    return ServiceTypeModel.findByIdAndUpdate(
        id,
        { $set: partialData },
        { new: true, runValidators: true }
    );
};

// Delete a service type by ID
export const deleteServiceTypeById = (id) => {
    return ServiceTypeModel.findByIdAndDelete(id);
};
