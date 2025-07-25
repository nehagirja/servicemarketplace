import express from "express";
import * as reviewController from "./../controllers/reviews-controller.js";

const router = express.Router();

router.route("/")
    .post(reviewController.createReview)
    .get(reviewController.getAllReviews);

router.route("/name").get(reviewController.getAllReviewsByName)

router.route("/:id")
    .get(reviewController.getReviewByBookingId)
// .put(reviewController.updateReview)
// .patch(reviewController.partiallyUpdateReview)
// .delete(reviewController.deleteReviewById);

export default router