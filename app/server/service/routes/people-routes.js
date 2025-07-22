import express from "express";
import * as peopleController from "./../controllers/people-controller.js";

const router = express.Router();

router.route("/")
    .post(peopleController.post)
    .get(peopleController.getAllPeople);

// router.route("/:id")
//     .get(availabilityController.getAvailabilityById)
//     .put(availabilityController.updateAvailabilityById)
//     .patch(availabilityController.updateAvailabilityFieldsById)
//     .delete(availabilityController.deleteAvailabilityById);
// // TEST
export default router