import { request, response } from "express";
import * as bookingService from "../services/booking-service.js";
import * as UserService from "../services/user-service.js";
import * as ServiceProviderService from "../services/service-provider-service.js";
import * as ServiceTypeService from "../services/service-types.js";

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


export const getAllBooking = async (request, response) => {
    try {
      const page = parseInt(request.query.page) || 1;
      const count = parseInt(request.query.count) || 10;
      const serviceProviderId = request.query.service_provider_id; // Get service_provider_id from query params
      const user_id = request.query.user_id;
     
      const filters = {};
      if (serviceProviderId) {
        filters.service_provider_id = serviceProviderId; // Add service_provider_id to filters
      }
      if(user_id){
        filters.user_id = user_id;
      }

      const { bookings, metadata } = await bookingService.fetchAllBookings(page, count, filters);
      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.total_amount, 0);
      const completedBookings = metadata.completed;
      const pendingAndConfirmedBooking = metadata.pendingAndConfirmed;

      const totalBookings = await bookingService.getTotalBookingCount(filters);
      const totalPages = Math.ceil(totalBookings / count);
  
      const responseData = {
        metadata: {
          total_items: totalBookings,
          total_pages: totalPages,
          total_revenue: totalRevenue,
          current_page: page,
          completedBookings: completedBookings,
          pendingAndConfirmedBooking: pendingAndConfirmedBooking,
        },
        items: bookings,
      };
  
      setSuccess(responseData, null, response);
    } catch (error) {
      setError(error, response);
    }
  };
  
export const initiateBooking = async(request,response) =>{
    try {
        const newBooking = { ...request.body };
        const booking = await bookingService.save(newBooking);
        setSuccess(booking, "Booking created Successfully", response);
    } catch (error) {
        setError(error, response);
    }
}

export const cancelBooking = async(request,response) => {
    try{
        const { id } = request.params;
        const updatedData = request.body; 
        const booking = await bookingService.findByIdAndCancel(id,updatedData);
        setSuccess(booking, "Booking cancelled Successfully", response);
    }catch(error){
        setError(error, response);
    }
}

//getBooking

export const getBookingById = async (request, response) => {
    console.log("Get Booking by ID : ");
    try {
        const { id } = request.params;
        const booking = await bookingService.findById(id);
        
        const UserData = await UserService.findUserById(booking.user_id);
        console.log("UserData : " + JSON.stringify(UserData));

        const bookingWithUserDetails = {
          ...booking.toObject(), // Ensure toObject() is called if booking is a Mongoose document
          UserData,
      };

        console.log("Booking : " + JSON.stringify(booking));  
        setSuccess(bookingWithUserDetails,null, response);
    }
    catch (error) {
        setError(error, response);
    }
};


