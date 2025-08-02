import React, {useEffect } from "react";
import ServiceProviderNavbar from "../../components/navbar/index.tsx";
import CardsWithBookingInfo from "../../components/CardGridWithSpacing.tsx";
import BookingTable from "./BookingsTable.tsx";
import "../../assets/style/service-provider-dashboard.css";
// import { getAllBookings } from "../../services/api/serviceProviderAPIs";
import { getUserData } from "../../services/api/authAPIs";
// import { getBatchServiceTypes } from "../../services/api/customerHomeAPIs";

// type Service = {
//   id: string;
//   name: string;
//   description: string;
// };
 
const LandingPage: React.FC = () => {
  useEffect(() => {
    const fetchInitialData = async () => {
      const token = localStorage.getItem("AUTH_ACCESS_TOKEN");
      if (!token) {
        console.error("No access token found. Redirecting to login.");
        return; // Optionally redirect to login
      }
 
      try {
        // Fetch user data
        const userResponse = await getUserData();
        const user = userResponse.data.user;
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("role", user.role);
        sessionStorage.setItem("id", user._id);
 
 
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
 
    fetchInitialData();
  }, []);
 
  return (
    <div className="landing-page">
      <ServiceProviderNavbar />
      <CardsWithBookingInfo />
      <BookingTable />
    </div>
  );
};
 
export default LandingPage;