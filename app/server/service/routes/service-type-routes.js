import express from "express";
import * as serviceTypeController from "../controllers/service-type-controller.js";

const router = express.Router();

// Route for creating a new service type and fetching all service types
router.route('/')
    .post(serviceTypeController.createServiceType)
    .get(serviceTypeController.getAllServiceTypes);

// Route for fetching, updating, partially updating, and deleting a service type by ID
router.route('/:id')
    .get(serviceTypeController.getServiceTypeById)
    .put(serviceTypeController.updateServiceType)
    .patch(serviceTypeController.partiallyUpdateServiceType)
    .delete(serviceTypeController.deleteServiceTypeById);

// Route for getting a service type by role type
// router.route('/roleType/:roleType')
//     .get(serviceTypeController.getServiceTypeByRoleType);  // error method not defined.

export default router;
