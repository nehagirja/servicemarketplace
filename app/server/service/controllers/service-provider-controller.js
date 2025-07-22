import * as serviceProviderService from "../services/service-provider-service.js";
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
import {
    checkValidObjectId
} from '../utils/validations.js';

// GET: List all service providers
export const getAll = async (req, res) => {
    try {
        const providers = await serviceProviderService.getAllServiceProviders();
        setSuccess(providers, null, res);
    } catch (error) {
        setError(err, res);
    }
};

// GET: Get a single service provider by ID
export const getById = async (req, res) => {
    try {
        const serviceProviderId = req.params.id;

        //Check if the ID is valid 
        const isValidId = checkValidObjectId(serviceProviderId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid User ID format"), res);
        }
        const provider = await serviceProviderService.getServiceProviderById(serviceProviderId);
        setSuccess(provider, null, res);
    } catch (error) {
        setError(error, res);
    }
};

// POST: Create a new service provider
export const create = async (req, res) => {
    try {
        const { _id } = req.body;
        // Check if the service provider already exists
        const existingProvider = await serviceProviderService.getServiceProviderById(_id);
        if (existingProvider) {
            return setConflict(new Error("Service provider with this ID already exists"), res);
        }
        // Create a new service provider
        const provider = await serviceProviderService.createServiceProvider(req.body);
        setSuccess(provider, "Service provider created successfully", res);
    } catch (error) {
        setError(error, res);
    }
};


// PUT: Update an existing service provider
export const update = async (req, res) => {
    try {
        const providerId = req.params.id;
        const {
            ...updatedData
        } = req.body;
        const isValidId = checkValidObjectId(providerId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid Service Provider ID format"), res);
        }

        const updatedProvider = await serviceProviderService.updateServiceProvider(providerId, updatedData);

        if (!updatedProvider) {
            return setNotFound(new Error('Service provider not found'), res);
        }

        setSuccess(updatedProvider, "Service Provider details updated Successfully", res);
    } catch (error) {
        setError(error, res);
    }
};

// PATCH: Partially update a specific service provider by service_provider_id
export const partialUpdate = async (req, res) => {
    try {
        const providerId = req.params.id;
        const partialData = req.body;
        // Check if the ID is valid
        const isValidId = checkValidObjectId(providerId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid Service provider ID format"), res);
        }
        // Prevent updates to the createdDate field
        if ('createdDate' in partialData) {
            delete partialData.createdDate;
        }
        const updatedProvider = await serviceProviderService.partialUpdateServiceProvider(providerId, partialData);
        setSuccess(updatedProvider, "Service Provider details updated Successfully", res);
    } catch (error) {
        setError(error, res);
    }
};

// DELETE: Delete a service provider
export const deleteProvider = async (req, res) => {
    try {
        const providerId = req.params.id;

        // Check if the ID is valid
        const isValidId = checkValidObjectId(providerId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid Service Provider ID format"), res);
        }
        const deletedProvider = await serviceProviderService.deleteServiceProvider(providerId);
        if (deletedProvider) {
            setSuccess(null, "Service Provider deleted successfully", res);
        } else {
            return setNotFound(new Error("Service Provider not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};