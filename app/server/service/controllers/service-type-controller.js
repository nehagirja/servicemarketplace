import * as ServiceTypeService from "../services/service-types.js";
import {
    setSuccess,
    setError,
    setBadRequest,
    setNotFound,
    setConflict,
    setResourceCreated,
} from "../utils/response-handlers.js";
import { checkValidObjectId } from "../utils/validations.js";

// Create a new service type (POST)
export const createServiceType = async (req, res) => {
    try {
        const newServiceType = req.body;
        if (!newServiceType.role_type || !newServiceType.description) {
            return setBadRequest(new Error("Role type and description are required"), res);
        }
        // Check if role type already exists
        const existingServiceType = await ServiceTypeService.getServiceTypeByRoleType(newServiceType.role_type);
        if (existingServiceType) {
            return setConflict(new Error("Role type already exists"), res);
        }

        const savedServiceType = await ServiceTypeService.createServiceType(newServiceType);
        setResourceCreated(savedServiceType, "Service type created successfully", res);
    } catch (error) {
        setError(error, res);
    }
};

// Get a service type by ID
export const getServiceTypeById = async (req, res) => {
    try {
        const serviceTypeId = req.params.id;

        // Validate the ID
        if (!checkValidObjectId(serviceTypeId)) {
            return setBadRequest(new Error("Invalid service type ID format"), res);
        }

        const serviceType = await ServiceTypeService.getServiceTypeById(serviceTypeId);
        if (serviceType) {
            setSuccess(serviceType, null, res);
        } else {
            setNotFound(new Error("Service type not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};

// Get all service types
export const getAllServiceTypes = async (req, res) => {
    try {
        const serviceType = req.query.serviceType || "";
        const popular = req.query.popular || false;
        const serviceTypes = await ServiceTypeService.getAllServiceTypes(serviceType,popular);
        setSuccess(serviceTypes, null, res);
    } catch (error) {
        setError(error, res);
    }
};

// Update a service type by ID
export const updateServiceType = async (req, res) => {
    try {
        const serviceTypeId = req.params.id;
        const updatedData = req.body;

        // Validate the ID
        if (!checkValidObjectId(serviceTypeId)) {
            return setBadRequest(new Error("Invalid service type ID format"), res);
        }

        const updatedServiceType = await ServiceTypeService.updateServiceType(serviceTypeId, updatedData);
        if (updatedServiceType) {
            setSuccess(updatedServiceType, "Service type updated successfully", res);
        } else {
            setNotFound(new Error("Service type not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};

// Partially update a service type by ID
export const partiallyUpdateServiceType = async (req, res) => {
    try {
        const serviceTypeId = req.params.id;
        const partialData = req.body;

        // Validate the ID
        if (!checkValidObjectId(serviceTypeId)) {
            return setBadRequest(new Error("Invalid service type ID format"), res);
        }

        const updatedServiceType = await ServiceTypeService.updatePartialServiceType(serviceTypeId, partialData);
        if (updatedServiceType) {
            setSuccess(updatedServiceType, "Service type partially updated successfully", res);
        } else {
            setNotFound(new Error("Service type not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};

// Delete a service type by ID
export const deleteServiceTypeById = async (req, res) => {
    try {
        const serviceTypeId = req.params.id;

        // Validate the ID
        if (!checkValidObjectId(serviceTypeId)) {
            return setBadRequest(new Error("Invalid service type ID format"), res);
        }

        const deletedServiceType = await ServiceTypeService.deleteServiceTypeById(serviceTypeId);
        if (deletedServiceType) {
            setSuccess(null, "Service type deleted successfully", res);
        } else {
            setNotFound(new Error("Service type not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};
