// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import routes from "../../constants/routes.json";

import React, { useState } from "react";
import NavBar from "../../components/navbar/index.tsx";
import "./home.css";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';


interface Booking {
    _id: string;
    street_address: string;
    unit_apt: string;
    task_details: string;
    date: string;
    start_time: string;
    number_of_hours: string;
    total_amount: number;
    status: string;
    created_at: string;
    updated_at: string;
  }
//Using the fugu web share capability for sharing the booking history
const ShareBookingHistory: React.FC = () => {

 const { t } = useTranslation();
  const location = useLocation();
  const { booking } = location.state as { booking: Booking }; 

 
  const textData = ` ${booking.task_details}, 
${t("shareBooking.streetAddress")}: ${booking.street_address}, 
${t("shareBooking.unitOrApt")}: ${booking.unit_apt}, 
${t("shareBooking.startTime")}: ${booking.start_time}, 
${t("shareBooking.numberOfHours")}: ${booking.number_of_hours}, 
${t("shareBooking.totalAmount")}: $${booking.total_amount}, 
${t("shareBooking.status")}: ${booking.status}, 
${t("shareBooking.taskDate")}: ${booking.date.split("T")[0]}`;

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


// share implemented using web share (email, notes, reminanders etc) and booking history can be shared via whatsapp as well.

return (
  <div>
    <NavBar />
    <h1>{t("shareBooking.shareDetails")}</h1>
    <p>
      {t("shareBooking.task")}: {textData}
    </p>
    <p>
      {t("shareBooking.taskDate")}: {booking.date.split("T")[0]}
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

export default ShareBookingHistory;
