import express from "express";
import * as availabilityController from "./../controllers/availability-controller.js";

const router = express.Router();

router.route("/")
    .post(availabilityController.post)
    .get(availabilityController.getAllAvailability);

router.route("/:id")
    .get(availabilityController.getAvailabilityById)
    .put(availabilityController.updateAvailabilityById)
    .patch(availabilityController.updateAvailabilityFieldsById)
    .delete(availabilityController.deleteAvailabilityById);
// TEST
export default router