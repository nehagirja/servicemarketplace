import BookingModel from "../models/booking-models.js";
import mongoose from "mongoose";

import { getServiceTypeById } from "../services/service-types.js"; // Import the service type helper

export const fetchAllBookings = async (page, count, filters = {}) => {
  const skip = (page - 1) * count;

  // Convert service_provider_id to ObjectId if it exists in filters
  if (filters.service_provider_id) {
    filters.service_provider_id = new mongoose.Types.ObjectId(filters.service_provider_id);
  }
  if(filters.user_id){
    filters.user_id = new mongoose.Types.ObjectId(filters.user_id);
  }
  try {
    // Fetch paginated bookings
    const bookings = await BookingModel.find(filters).skip(skip).limit(count);

    // Enhance bookings by adding service type name
    const enhancedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const serviceType = await getServiceTypeById(booking.service_type_id);
        return {
          ...booking.toObject(),
          serviceTypeName: serviceType ? serviceType.role_type : "Unknown", // Add service type name
        };
      })
    );

    // Calculate additional statistics
    const completedCount = await BookingModel.countDocuments({
      ...filters,
      status: "completed",
    });

    const pendingAndConfirmedCount = await BookingModel.countDocuments({
      ...filters,
      status: { $in: ["pending", "confirmed"] },
    });

    const totalItems = await BookingModel.countDocuments(filters);
    const totalPages = Math.ceil(totalItems / count);

    return {
      bookings: enhancedBookings, // Return enhanced bookings
      metadata: {
        total_items: totalItems,
        total_pages: totalPages,
        current_page: page,
        completed: completedCount,
        pendingAndConfirmed: pendingAndConfirmedCount,
      },
    };
  } catch (error) {
    throw new Error("Error fetching bookings: " + error.message);
  }
};


export const getTotalBookingCount = (filters = {}) => {
  return BookingModel.countDocuments(filters); // Pass filters to countDocuments
};

export const save = (newService) => {
    const booking = new BookingModel(newService);
    return booking.save();
};

export const deleteBooking = async (id) =>{
    const booking = await BookingModel.findByIdAndDelete(id);
    return result !== null;
};

export const findByIdAndCancel = async (id, data) => {
    return BookingModel.findByIdAndUpdate(id, data, { new: true });
};

export const findById = async (id) => {
    const bookingById = await BookingModel.findById(id);
    return bookingById;

};
