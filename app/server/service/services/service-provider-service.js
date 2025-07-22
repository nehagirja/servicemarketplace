import ServiceProvider from "../models/service-provider.js";

// Get all service providers
export const getAllServiceProviders = async () => {
    return await ServiceProvider.find();
};

// Get service provider by ID
export const getServiceProviderById = async (service_provider_id) => {
    return await ServiceProvider.findById(service_provider_id);
};

// Create new service provider
export const createServiceProvider = async (data) => {
    const newProvider = new ServiceProvider(data);
    return await newProvider.save();
};

// Update service provider
export const updateServiceProvider = async (service_provider_id, data) => {
    return await ServiceProvider.findByIdAndUpdate(service_provider_id, data, {
        new: true,
        runValidations: true
    });
};

export const partialUpdateServiceProvider = async (service_provider_id, data) => {
    return await ServiceProvider.findByIdAndUpdate(
            service_provider_id, // Filter by user_id
        {
            $set: data
        }, // Data to update
        {
            new: true,
            runValidators: true
        });
};

// Delete service provider
export const deleteServiceProvider = async (service_provider_id) => {
    // console.log("Provider Id in service: ",service_provider_id);
    return ServiceProvider.findByIdAndDelete(service_provider_id);
};