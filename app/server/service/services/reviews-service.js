import ReviewModel from "../models/reviews.js";

// Save a new review 
export const saveReview = (newReview) => {
    const review = new ReviewModel(newReview);
    return review.save();
};

//Get all reviews
export const fetchAllReviews = async () => {
    const allReviews = await ReviewModel.find();
    return allReviews;
};

// Get all reviews by name
export const fetchAllReviewsByName = async () => {
    const allReviews = await ReviewModel.find()
        .populate('userId', 'name')  // Populate the user name from Users table
        .populate('serviceProviderId', 'name');  // Populate the service provider name from Users table
    return allReviews;
};

// Get a review by its unique ID
export const findReviewById = (id) => {
    return ReviewModel.findOne({ bookingId: id });
};

// Update an entire review record
export const updateReview = (id, updatedData) => {
    return ReviewModel.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
};

// Partially update a review's data
export const updatePartialReview = async (id, updateData) => {
    return ReviewModel.findByIdAndUpdate(
        id, {
            $set: updateData
        }, {
            new: true,
            runValidators: true
        }
    );
};

// Delete the review by its ID
export const deleteReviewById = (id) => {
    return ReviewModel.findByIdAndDelete(id);
};