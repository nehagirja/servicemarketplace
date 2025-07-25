import * as reviewService from "./../services/reviews-service.js";
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

// Save a new review (POST)
export const createReview = async (request, response) => {
    try {
        const newReview = {
            ...request.body
        };
        const review = await reviewService.saveReview(newReview);
        const responseData = {
            review_id: review._id,
            rating: review.rating,
            comment: review.comment
        };
        setResourceCreated(responseData, "Review created successfully", response);
    } catch (error) {
        setError(error, response);
    }

}

// Get all reviews by name(GET)
export const getAllReviewsByName = async (request, response) => {
    try {
        const reviews = await reviewService.fetchAllReviews();
        if (reviews.length > 0) {
            const responseData = reviews.map(review => ({
                booking_id: review.bookingId,
                user_name: review.userId ? review.userId.name : 'N/A',  // Add user name
                service_provider_name: review.serviceProviderId ? review.serviceProviderId.name : 'N/A',  // Add service provider name
                rating: review.rating,
                comment: review.comment,
                created_at: review.createdAt
            }));
            setSuccess(responseData, null, response);
        } else {
            return setNotFound(new Error("No reviews found"), response);
        }
    } catch (error) {
        setError(error, response);
    }
}

// Get all reviews (GET)
export const getAllReviews = async (request, response) => {
    try {
        const reviews = await reviewService.fetchAllReviews();
        if (reviews.length > 0) {
            const responseData = reviews.map(review => ({
                booking_id: review.bookingId,
                user_id: review.userId,
                service_provider_id: review.serviceProviderId,
                rating: review.rating,
                comment: review.comment,
                created_at: review.createdAt
            }));
            setSuccess(responseData, null, response);
        } else {
            return setNotFound(new Error("No reviews found"), response);
        }
    } catch (error) {
        setError(error, response);
    }
}

// Find a review by it's booking ID (GET BY ID)
export const getReviewByBookingId = async (req, res) => {
    try {
        const bookingId = req.params.id;
        // Check if the ID is valid
        // const isValidId = checkValidObjectId(bookingId);
        // if (!isValidId) {
        //     return setBadRequest(new Error("Invalid Booking ID format"), res);
        // }

        const review = await reviewService.findReviewById(bookingId);
        if (review) {
            const responseData = {
                user_id: review.userId,
                service_provider: review.serviceProviderId,
                rating: review.rating,
                comment: review.comment
            };
            setSuccess(responseData, null, res);
        } else {
            return setNotFound(new Error("Review not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};

// Update a review by ID (PUT)
export const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        // Excluding createdAt during update as it is a DB metric
        const {
            createdAt,
            ...updatedData
        } = req.body;

        // Check if the ID is valid
        const isValidId = checkValidObjectId(reviewId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid Review ID format"), res);
        }

        const updatedReview = await reviewService.updateReview(reviewId, updatedData);
        if (!updatedReview) {
            return setNotFound(new Error("Review not found"), res);
        }
        setSuccess(updatedReview, "Review updated successfully", res);
    } catch (error) {
        setError(error, res);
    }
};

// Partially update a review by ID(PATCH)
export const partiallyUpdateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const partialData = req.body;

        // Check if the ID is valid
        const isValidId = checkValidObjectId(reviewId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid Review ID format"), res);
        }

        const updatedReview = await reviewService.updatePartialReview(reviewId, partialData);
        setSuccess(updatedReview, "Review updated successfully", res);
    } catch (error) {
        setError(error, res);
    }
};

// Delete a review by ID (delete)
export const deleteReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;

        // Check if the ID is valid
        const isValidId = checkValidObjectId(reviewId);
        if (!isValidId) {
            return setBadRequest(new Error("Invalid Review ID format"), res);
        }

        const deletedReview = await reviewService.deleteReviewById(reviewId);
        if (deletedReview) {
            setSuccess(null, "Review deleted successfully", res);
        } else {
            return setNotFound(new Error("Review not found"), res);
        }
    } catch (error) {
        setError(error, res);
    }
};