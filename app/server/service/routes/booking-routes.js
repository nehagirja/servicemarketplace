import express from "express";
import * as bookingController from "./../controllers/booking-controller.js";

const router = express.Router();

router.route("/")
    .get(bookingController.getAllBooking)
    .post(bookingController.initiateBooking);

router.route("/:id")    
    .patch(bookingController.cancelBooking)
    .get(bookingController.getBookingById);
    
export default router

