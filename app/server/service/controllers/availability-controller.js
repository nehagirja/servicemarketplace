import { request, response } from "express";
import * as availabilityService from "./../services/availability-service.js";

// Function to check if required fields are present in the request body
const validateAvailabilityFields = (body) => {
    const requiredFields = [
        "serviceProviderId",
        "dayOfWeek",
        "startTime",
        "numberOfHours",
        "availabilityStatus"
    ];

    for (let field of requiredFields) {
        if (!body.hasOwnProperty(field)) {
            return { valid: false, message: `Missing required field: ${field}` };
        }
    }
    return { valid: true };
};

export const post = async (request, response) => {
    const validation = validateAvailabilityFields(request.body);
    if (!validation.valid) {
        return response.status(400).json({ message: validation.message });
    }

    const newAvailability = { ...request.body };
    console.log("REQUEST BODY RECEIVED: ", request.body);

    try {
        const availability = await availabilityService.save(newAvailability);
        response.status(201).json(availability); // Return 201 for created resource
    } catch (error) {
        response.status(500).json({ message: "Internal server error: " + error.message });
    }
};

export const getAllAvailability = async (request, response) => {
    try {
        const allAvailability = await availabilityService.getAllAvailability();
        if (allAvailability.length === 0) {
            return response.status(404).json({ message: "No availability records found" });
        }
        response.status(200).json(allAvailability);
    } catch (error) {
        response.status(500).json({ message: "Internal server error: " + error.message });
    }
};

export const getAvailabilityById = async (request, response) => {
    try {
        const availabilityId = request.params.id;
        const availabilityById = await availabilityService.getAvailabilityById(availabilityId);
        if (!availabilityById) {
            return response.status(404).json({ message: "Availability not found" });
        }
        response.status(200).json(availabilityById);
    } catch (error) {
        response.status(500).json({ message: "Internal server error: " + error.message });
    }
};

export const updateAvailabilityById = async (request, response) => {
    try {
        const availabilityId = request.params.id;
        const newAvailabilityData = request.body;

        // Validate the request body for required fields
        const validation = validateAvailabilityFields(newAvailabilityData);
        if (!validation.valid) {
            return response.status(400).json({ message: validation.message });
        }

        const updatedAvailability = await availabilityService.updateAvailabilityById(availabilityId, newAvailabilityData);
        if (!updatedAvailability) {
            return response.status(404).json({ message: "Availability not found" });
        }
        response.status(200).json(updatedAvailability);
    } catch (error) {
        response.status(500).json({ message: "Internal server error: " + error.message });
    }
};

export const updateAvailabilityFieldsById = async (request, response) => {
    try {
        const availabilityId = request.params.id;
        const newAvailabilityFields = request.body;

        // Validate the request body for required fields
        const validation = validateAvailabilityFields(newAvailabilityFields);
        if (!validation.valid) {
            return response.status(400).json({ message: validation.message });
        }

        const updatedAvailability = await availabilityService.updateAvailabilityFieldsById(availabilityId, newAvailabilityFields);
        if (!updatedAvailability) {
            return response.status(404).json({ message: "Availability not found" });
        }
        response.status(200).json(updatedAvailability);
    } catch (error) {
        response.status(500).json({ message: "Internal server error: " + error.message });
    }
};

export const deleteAvailabilityById = async (request, response) => {
    try {
        const availabilityId = request.params.id;
        const deletedAvailability = await availabilityService.deleteAvailabilityById(availabilityId);
        if (!deletedAvailability) {
            return response.status(404).json({ message: "Availability not found" });
        }
        response.status(200).json(deletedAvailability);
    } catch (error) {
        response.status(500).json({ message: "Internal server error: " + error.message });
    }
};
