import { createSlice } from '@reduxjs/toolkit';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    total_booking: 0,
    upcoming_booking: 0,
    completed_booking: 0,
    total_revenue: 0,
	  serviceProviderId: "",
    bookingId: "",
    selectedServiceType: "",
  },
  reducers: {
    // Dynamically calculate total_booking whenever upcoming or completed bookings are set
    setUpcomingBooking: (state, action) => {
      const { upcoming_booking } = action.payload;
      state.upcoming_booking = upcoming_booking;
      state.total_booking = state.upcoming_booking + state.completed_booking; // Update total_booking
    },

    setCompletedBooking: (state, action) => {
      console.log("Completed Booking: ", JSON.stringify(action.payload));
      const { completed_booking } = action.payload;
      console.log("CB : " + completed_booking)
      state.completed_booking = completed_booking;
      state.total_booking = state.upcoming_booking + state.completed_booking; // Update total_booking
    },

    setTotalRevenue: (state, action) => {
      console.log("Total Revenue : ", JSON.stringify(action.payload));
      const { total_revenue } = action.payload;
      state.total_revenue = total_revenue;
      // console.log("Total Revenue: ", total_revenue);
    },

    // Optional: Allow explicitly setting total_booking (if needed)
    setTotalBooking: (state, action) => {
      const { total_booking } = action.payload;
      state.total_booking = total_booking;
    },

    setServiceProviderId: (state, action) => {
        const { serviceProviderId } = action.payload;
        state.serviceProviderId = serviceProviderId;
      },

    setBookingId: (state, action) => {
      // console.log("Booking ID BEFORE : ", JSON.stringify(action.payload));
      const { bookingId } = action.payload;
      state.bookingId = bookingId;
      // console.log("Booking ID: ", bookingId);
      },

    setSelectedServiceType: (state, action) => {
      // console.log("Selected Service Type: ", JSON.stringify(action.payload));
      const { selectedServiceType } = action.payload;
      state.selectedServiceType = selectedServiceType;
      // console.log("selected service type: ", selectedServiceType);
      },
  },
});

export const { setTotalBooking, 
                setUpcomingBooking, 
                setCompletedBooking, 
                setServiceProviderId, 
                setBookingId,
                setSelectedServiceType,
                setTotalRevenue
              } = bookingSlice.actions;
