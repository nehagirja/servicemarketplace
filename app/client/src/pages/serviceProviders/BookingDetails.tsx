import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ServiceProviderNavbar from "../../components/navbar/index.tsx";
import { getBookingDetails } from "../../services/api/serviceProviderAPIs";
import "./bookingDetails.css"; // Import the CSS file
import { Divider, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { useParams } from "react-router";

export default function BookingDetails() {
  const { t } = useTranslation();
  const { seletedBookingId } = useParams();
  // const currentBookingId = seletedBookingId;

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    // setStatus(newStatus);

    // Perform additional logic if needed
    console.log("Updated status:", newStatus);
    // e.g., send the updated status to an API
  };
  
  console.log("Selected Booking ID : " + seletedBookingId);
  const [bookingDetails, setBookingDetails] = useState({
    _id: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userAddress: "",
    userPin: "",
    userState: "",
    userCountry: "",
    serviceTypeName: "",
    date: "",
    start_time: "",
    number_of_hours: "",
    total_amount: 0,
    status: "",
    created_at: "",
    updated_at: "",
    task_details: "",
    userHourlyRate: 0
  });

  const { bookingId, selectedServiceType } = useSelector((state: any) => state.booking);
  console.log("Booking ID : " + bookingId);
  console.log("Selected Service Type : " + selectedServiceType);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("Booking ID : " + bookingId);
        if (seletedBookingId) {
          const response = await getBookingDetails(seletedBookingId);
          console.log("RESPONSE BOOKING DETAIls : " + JSON.stringify(response.data));
          const updatedData = {
            ...response.data,
            serviceTypeName: selectedServiceType || "Unknown",
            userFirstName: response.data.UserData.firstName,
            userLastName: response.data.UserData.lastName,
            userEmail: response.data.UserData.email,
            userAddress: response.data.UserData.address,
            userPin: response.data.UserData.pin || "N/A",
            userState: response.data.UserData.state || "N/A",
            userCountry: response.data.UserData.country || "N/A",
            userHourlyRate: response.data.UserData.hourly_rate,
            task_details: response.data.task_details || "N/A",
          };
          
          setBookingDetails(updatedData);
          console.log("Updated Booking Details : " + JSON.stringify(bookingDetails));
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };



    getData();
  }, [bookingId, selectedServiceType]);

  return (
    <>
      
      <ServiceProviderNavbar />
      <Box className="grid-container">
        <Grid container spacing={2}>
          {/* Payment Details Section */}
          <Grid item xs={4} className="grid-item-4">
            <div className="payment-info">
              <Grid container spacing={2} direction="column" className="payment-container">
                {/* Total Section */}
                <Grid item xs={12} className="section-header" style={{ textAlign: "center", color: "black" }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", paddingBottom: "30px", fontSize: "28px" }}>
                    {t("labels.paymentInfo")}
                  </Typography>
                </Grid>

                {/* Payment Breakdown Section */}
                <Grid container spacing={1} direction="column" style={{ color: "black" }}>
                  {/* Professional Plan */}
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Box display="flex" justifyContent="space-between" sx={{ margin: "0 auto", maxWidth: "300px" }}>
                      <Typography variant="body1">{t("labels.ratePerHour")}</Typography>
                      <Typography variant="body1">${bookingDetails.userHourlyRate}</Typography>
                    </Box>
                  </Grid>

                  {/* Dedicated Support */}
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Box display="flex" justifyContent="space-between" sx={{ margin: "0 auto", maxWidth: "300px" }}>
                      <Typography variant="body1">{t("labels.numberOfHours")}</Typography>
                      <Typography variant="body1">{bookingDetails.number_of_hours} hrs</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} className="section-header" style={{ textAlign: "center", color: "black" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {t("labels.total")} ${bookingDetails.total_amount}
                    </Typography>
                  </Grid>
                  
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* Booking Details Section */}
          <Grid item xs={8} className="booking-info" style={{ marginTop: "20px" }}>
            {/* Booking ID */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                textAlign: "center",
                padding: "8px",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              {t("labels.bookingId")}: {bookingDetails._id}
            </Typography>

            {/* Customer Info Section */}
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}
              >
                {t("labels.customerInfo")}
              </Typography>

              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                    {t("labels.customerName")}
                  </Typography>
                  <FormControl fullWidth sx={{ width: "90%" }}>
                    <InputLabel htmlFor="customer-name">
                      <b>{`${bookingDetails.userFirstName} ${bookingDetails.userLastName}`}</b>
                    </InputLabel>
                    <OutlinedInput id="customer-name" disabled />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                    {t("labels.customerEmail")}
                  </Typography>
                  <FormControl fullWidth sx={{ width: "90%" }}>
                    <InputLabel htmlFor="customer-email">
                      <b>{bookingDetails.userEmail}</b>
                    </InputLabel>
                    <OutlinedInput id="customer-email" disabled />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                    {t("labels.customerAddress")}
                  </Typography>
                  <FormControl fullWidth sx={{ width: "90%" }}>
                    <InputLabel htmlFor="customer-address">
                      <b>{bookingDetails.userAddress}</b>
                    </InputLabel>
                    <OutlinedInput id="customer-address" disabled />
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                    {t("labels.pin")}
                  </Typography>
                  <FormControl fullWidth sx={{ width: "90%" }}>
                    <InputLabel htmlFor="pin">
                      <b>{bookingDetails.userPin}</b>
                    </InputLabel>
                    <OutlinedInput id="pin" disabled />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                    {t("labels.state")}
                  </Typography>
                  <FormControl fullWidth sx={{ width: "90%" }}>
                    <InputLabel htmlFor="state">
                      <b>{bookingDetails.userState}</b>
                    </InputLabel>
                    <OutlinedInput id="state" disabled />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                    {t("labels.country")}
                  </Typography>
                  <FormControl fullWidth sx={{ width: "90%" }}>
                    <InputLabel htmlFor="country">
                      <b>{bookingDetails.userCountry}</b>
                    </InputLabel>
                    <OutlinedInput id="country" disabled />
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Grid item xs={12} className="booking-info" style={{ marginTop: "20px" }}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}
                >
                  {t("labels.bookingInfo")}
                </Typography>

                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                      {t("labels.serviceType")}
                    </Typography>
                    <FormControl fullWidth sx={{ width: "90%" }}>
                      <InputLabel htmlFor="customer-name">
                        <b>{selectedServiceType}</b>
                      </InputLabel>
                      <OutlinedInput id="customer-name" disabled />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                      {t("labels.description")}
                    </Typography>
                    <FormControl fullWidth sx={{ width: "90%" }}>
                      <InputLabel htmlFor="customer-email">
                        <b>{bookingDetails.task_details}</b>
                      </InputLabel>
                      <OutlinedInput id="customer-email" disabled />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                      {t("labels.startTime")}
                    </Typography>
                    <FormControl fullWidth sx={{ width: "90%" }}>
                      <InputLabel htmlFor="customer-name">
                        <b>{bookingDetails.start_time}</b>
                      </InputLabel>
                      <OutlinedInput id="customer-name" disabled />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                      {t("labels.numberOfHours")}
                    </Typography>
                    <FormControl fullWidth sx={{ width: "90%" }}>
                      <InputLabel htmlFor="pin">
                        <b>{bookingDetails.number_of_hours}</b>
                      </InputLabel>
                      <OutlinedInput id="pin" disabled />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
                      {t("labels.status")}
                    </Typography>
                    <FormControl fullWidth sx={{ width: "90%" }}>
                      <InputLabel htmlFor="state">
                        <b>{bookingDetails.status}</b>
                      </InputLabel>
                      <OutlinedInput id="state" disabled />
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Booking Info */}


        </Grid>
      </Box>
    </>
  );

}
