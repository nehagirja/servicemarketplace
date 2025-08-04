import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import NavBar from "../../components/navbar/index.tsx";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import routes from "../../constants/routes.json";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { setBookingDetails } from '../../store/customerBookingSlice.ts';
import CustomisedSnackbar from '../../components/snackbar';
// import { MenuItem } from "@mui/material";
import axios from "axios";

/* 
  This component handles the booking process for partners.
  It displays a form with task details, location, and duration,
  and calculates the total amount based on the hourly rate.
  Upon submitting the form, it sends a POST request to the server
  with the booking details, and displays a success or error message.
*/
const PartnerBooking: React.FC = () => {
  const [taskLocation, setTaskLocation] = useState({
    streetAddress: "",
    unitOrApt: "",
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const location = useLocation();
  const { id, service_type_id, hourly_rate } = location.state || {};
  const userId =sessionStorage.getItem('id');

  const [totalAmount, setTotalAmount] = useState<number>(0); // State to store amount

  const [taskDetails, setTaskDetails] = useState("");
  // const [status, setStatus] = useState("pending"); // Default value
  let status = "confirmed";
  const [startTime, setStartTime] = useState(""); // Booking start time
  const [numberOfHours, setNumberOfHours] = useState<number>(0); // Duration in hours

  // const [totalAmount, setTotalAmount] = useState<number>(0); // Total amount

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Get the input value
    const hours = value ? parseInt(value, 10) : 0;// Parse the entered value as an integer
    setNumberOfHours(hours); // Update the number of hours
  };
  useEffect(() => {
    const computedTotal = numberOfHours * hourly_rate;
    setTotalAmount(computedTotal);
  }, [numberOfHours, hourly_rate]);


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setTaskLocation({
      ...taskLocation,
      [field]: event.target.value,
    });
  };
  const [date, setDate] = useState(""); // To store the selected date

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskDetails(event.target.value);
  };

  const handleSubmit = async () => {
    // Prepare the data to match the `BookingModel` schema
    const bookingData = {
      user_id: userId,
      service_provider_id: id,
      service_type_id: service_type_id,   ///use redux for this
      street_address: taskLocation.streetAddress,
      unit_apt: taskLocation.unitOrApt,
      task_details: taskDetails,
      date: date,
      start_time: startTime,
      number_of_hours: numberOfHours,
      total_amount: totalAmount, // Ensure this is a number
      status, // e.g., "pending"
    }; 
    if(!bookingData.date){
      setOpenSnackbar(true);
      setSnackbarMessage('Please select a date!');
      return;
    }
    dispatch(setBookingDetails(bookingData));
    const token = localStorage.getItem("AUTH_ACCESS_TOKEN"); // Replace with your actual token or retrieve it dynamically
    try {
      // Call the backend API
      const response = await axios.post(
        "http://localhost:3002/booking/",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in the headers
          },
        }
      );
      if(response.data){
        setOpenSnackbar(true);
        setSnackbarMessage('Booking created successfully!');
      }

      // Use the below call method 



      // alert("Booking created successfully!");
      navigate(routes.PAYMENT_GATEWAY, {
        state: { paymentAmount: totalAmount }, // Pass paymentAmount to the payment page
      });
    } catch (error: any) { // Add 'any' type to 'error' to avoid 'unknown' type error
      // alert("Failed to create booking. Please try again.");
      console.log("Error: ", error)
        setOpenSnackbar(true);
        setSnackbarMessage('Failed to create booking. Please try again!');
    }
  };

  const navigate = useNavigate();

  const handleWebShare = () => {
    navigate(routes.SHARE_DETAILS, {
      state: {
        //  taskBookingDetails : taskLocation.streetAddress + taskLocation.unitOrApt + taskDetails,
        // taskBookingDetails: `${taskLocation.streetAddress}, ${taskLocation.unitOrApt}, ${taskDetails}`.replace(/,\s*,/g, ",").replace(/(^,\s*|\s*,$)/g, ""),
        taskBookingDetails: `${taskLocation.streetAddress}, ${taskLocation.unitOrApt}, ${taskDetails}, Date: ${date}, Start Time: ${startTime}, Duration: ${numberOfHours} hours, Total Amount: $${totalAmount}`
          .replace(/,\s*,/g, ",") // Remove duplicate commas
          .replace(/(^,\s*|\s*,$)/g, ""), // Remove leading/trailing commas

        task_date: date,
      },
    });
  };


  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", // Navbar on top, form below
      }}
    >
      
      <CustomisedSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        clickHandler={() => setOpenSnackbar(false)}
        onClose={() => setOpenSnackbar(false)}
      />
      {/* Navbar on Top */}
      <NavBar />

      {/* Centered Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            maxWidth: "600px",
            width: "100%",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                color: "#0066cc",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {t("booking.title")}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ marginTop: "10px", fontSize: "1.1rem", color: "#333333" }}
            >
              {t("booking.taskLocation")}
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <TextField
                label={t("booking.streetAddress")}
                variant="outlined"
                fullWidth
                margin="normal"
                value={taskLocation.streetAddress}
                onChange={(e) =>
                  handleInputChange(e, "streetAddress")
                }
              />
              <TextField
                label={t("booking.unitOrApt")}
                variant="outlined"
                fullWidth
                margin="normal"
                value={taskLocation.unitOrApt}
                onChange={(e) =>
                  handleInputChange(e, "unitOrApt")
                }
              />
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ marginTop: "20px", fontSize: "1.1rem", color: "#333333" }}
            >
              {t("booking.taskDetails")}
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <TextField
                label={t("booking.detailsPlaceholder")}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={taskDetails}
                onChange={handleDetailsChange}
              />
            </Box>

            <Typography
              variant="subtitle2"
              sx={{ marginTop: "20px", fontSize: "1.1rem", color: "#333333" }}
            >
              {t("booking.timingAndCost")}
            </Typography>
            <Box sx={{ marginTop: "20px" }}>
              <TextField
                label={t("booking.startTime")}
                variant="outlined"
                fullWidth
                margin="normal"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <TextField
                label={t("booking.duration")}
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={numberOfHours}
                onChange={handleDurationChange}
              />
              <TextField
                label={t("booking.totalAmount")}
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={numberOfHours * hourly_rate}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <Typography
              variant="subtitle2"
              sx={{ marginTop: "20px", fontSize: "1.1rem", color: "#333333" }}
            >
              {t("booking.taskDate")}
            </Typography>
            <Box sx={{ marginTop: "10px" }}>
              <TextField
                label={t("booking.datePlaceholder")}
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#28a745",
                  color: "white",
                  width: "48%",
                  "&:hover": { backgroundColor: "#218838" },
                }}
                onClick={handleSubmit}
              >
                {t("booking.bookPay")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default PartnerBooking;
