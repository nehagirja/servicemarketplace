// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import routes from "../../constants/routes.json";

import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/navbar/index.tsx";
import "./home.css";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {useSelector} from 'react-redux'; 
import { RootState } from '../../store/reducers';
/*
  This component displays the shared booking details to the customer.
*/

const ShareDetails: React.FC = () => {
 // const [taskDetails, setTaskDetails] = useState("Fix the plumbing issue in the kitchen."); // Example data
 // const [date, setDate] = useState("2024-12-10");
 const { t } = useTranslation();
  const location = useLocation();

  const [date, setDate] = useState("2024-12-10");

  const bookingDetailsCustomer = useSelector((state: RootState) => state.customerBooking.bookingDetails);
  if (bookingDetailsCustomer) {
    console.log("Booking details customer:", bookingDetailsCustomer.date);
  } else {
    console.log("Booking details customer is null");
  }

  // const textData = `Task Details: ${bookingDetailsCustomer?.task_details}, 
  // Street Address: ${bookingDetailsCustomer?.street_address}, 
  // Unit or Apartment: ${bookingDetailsCustomer?.unit_apt}, 
  // Start Time: ${bookingDetailsCustomer?.start_time}, 
  // Number of Hours: ${bookingDetailsCustomer?.number_of_hours}, 
  // Total Amount: $${bookingDetailsCustomer?.total_amount}, 
  // Status: ${bookingDetailsCustomer?.status}, 
  // Date: ${bookingDetailsCustomer?.date}`;
  
  /*
    Added internationalization for the booking texts in English, Spanish, French and Tamil.
  */
  const textData = `${t("shareBooking.taskDetails")}: ${bookingDetailsCustomer?.task_details}, 
${t("shareBooking.streetAddress")}: ${bookingDetailsCustomer?.street_address}, 
${t("shareBooking.unitOrApt")}: ${bookingDetailsCustomer?.unit_apt}, 
${t("shareBooking.startTime")}: ${bookingDetailsCustomer?.start_time}, 
${t("shareBooking.numberOfHours")}: ${bookingDetailsCustomer?.number_of_hours}, 
${t("shareBooking.totalAmount")}: $${bookingDetailsCustomer?.total_amount}, 
${t("shareBooking.status")}: ${bookingDetailsCustomer?.status}, 
${t("shareBooking.taskDate")}: ${bookingDetailsCustomer?.date}`;

  console.log("text-data",textData);
  const handleWebShare = async () => {
    const shareData = {
      title: "Service Booking Details",
      text: textData,
     // url: `http://localhost:3000/login`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };

  const shareToWhatsApp = () => {
    const message = encodeURIComponent(`Task Details: ${textData}\n`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };




return (
  <div>
    <NavBar />
    <h1>{t("shareBooking.shareDetails")}</h1>
    <p>
      {t("shareBooking.task")}: {textData}
    </p>
    <p>
      {t("shareBooking.taskDate")}: {bookingDetailsCustomer?.date}
    </p>

    <Button
      onClick={handleWebShare}
      variant="contained"
      color="primary"
      style={{ margin: "10px" }}
    >
      {t("shareBooking.viaWebShare")}
    </Button>
    <Button
      onClick={shareToWhatsApp}
      variant="contained"
      color="success"
      style={{ margin: "10px" }}
    >
      {t("shareBooking.toWhatsApp")}
    </Button>
  </div>
);

};

export default ShareDetails;
