import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking", 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person", 
    required: true,
  },
  serviceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person", 
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 5, 
  },
  comment: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const ReviewModel = mongoose.model("Review", reviewSchema);

export default ReviewModel;
