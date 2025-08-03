import axios from 'axios';

// interface QueryParameters {
//   serviceType?: string; // Optional, depending on whether it's used for filtering
// }

interface ApiResponse {
  data: any[]; // Define the shape of the booking data for better type safety
}

// Define the structure of UserData
type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  pin: number;
  state: string;
  country: string;
  hourly_rate: number;
  service_type: string;
  
};

// Define the structure of BookingDetails
type BookingDetails = {
  data: {
    _id: string;
    user_id: string;
    service_type_id: string;
    date: string;
    start_time: string;
    number_of_hours: string;
    total_amount: number;
    status: string;
    created_at: string;
    updated_at: string;
    UserData: UserData; // Embed UserData type
    hourly_rate: number;
    serviceTypeName: string;
    task_details: string;
  }
};


export const getAllBookings = async (serviceProviderId: string): Promise<ApiResponse> => {
  // Retrieve the token from localStorage
  const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");
  console.log("accessToken : ", accessToken);
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/booking`, {
      params: { service_provider_id: serviceProviderId }, // Add service_provider_id as a query parameter
      headers: {
        Authorization: `Bearer ${accessToken}`, // Add token to the header
      },
    });
    console.log("RES : " + JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${(error as Error).message}`);
  }
};

export const getBookingDetails = async (bookingId: string): Promise<BookingDetails> => {
  // Retrieve the token from localStorage
  const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");
  console.log("accessToken : ", accessToken);
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
      params: { bookingId: bookingId }, // Add bookingId as a query parameter
      headers: {
        Authorization: `Bearer ${accessToken}`, // Add token to the header
      },
    });
    console.log("RES : " + JSON.stringify(response.data))
    return response.data as BookingDetails;
  } catch (error) {
    throw new Error(`Error fetching booking details : ${(error as Error).message}`);
  }
};
