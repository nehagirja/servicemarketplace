import express from "express";
import * as providerController from "../controllers/service-provider-controller.js";

const router = express.Router();

// Route for handling operations on all service providers
router.route('/')
    .get(providerController.getAll) // Retrieve all service providers
    .post(providerController.create); // Create a new service provider

// Route for handling operations on a specific service provider by ID
router.route('/:id') 
    .get(providerController.getById) // Retrieve a service provider by ID
    .put(providerController.update) // Update an entire service provider record
    .patch(providerController.partialUpdate) // Partially update a service provider record
    .delete(providerController.deleteProvider); // Delete a service provider by ID

export default router;
