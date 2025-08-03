import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../components/navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import urls from "../../constants/routes.json";
import Loader from "../../components/loader/index.tsx";

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

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // State for storing bookings
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState<number>(1); // Total pages for pagination
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [openDialog, setOpenDialog] = useState<boolean>(false); // State for dialog visibility
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null); // Selected booking details

  const token = localStorage.getItem("AUTH_ACCESS_TOKEN"); // Get token from local storage
  const BASE_URL = "http://localhost:3002/booking"; // Replace with your backend URL

  const navigate = useNavigate();


  const user_id = sessionStorage.getItem("id");
  // Fetch bookings from the backend API
  const fetchBookings = async (page: number) => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await axios.get(BASE_URL, {
        params: { user_id, page, count: 10 },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      const { metadata, items } = response.data.data; // Destructure metadata and items
      setBookings(items); // Update bookings
      setCurrentPage(metadata.current_page); // Update current page
      setTotalPages(metadata.total_pages); // Update total pages
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  // Fetch bookings when the component mounts or when the page changes
  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  // Handle pagination change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (booking: Booking) => {
    setSelectedBooking(booking); // Set the selected booking
    setOpenDialog(true); // Open the dialog
  };
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setSelectedBooking(null);
  };

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#f0f4f8",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ marginBottom: "20px", textAlign: "center", color: "#0066cc" }}
        >
          Booking History
        </Typography>
        {isLoading ?
          <Loader isFetching={isLoading} /> :
          <>
            {/* Booking Cards */}
            <Grid container spacing={2}>
              {isLoading ? (

                <Loader isFetching={isLoading} />
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Grid item xs={12} sm={6} md={4} key={booking._id} height='380px'>
                    <Card
                      key={booking._id}
                      sx={{
                        marginBottom: "20px",
                        borderRadius: "15px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        backgroundColor: "#fff",
                        height: "100% ",
                      }}
                    >
                      <Grid sx={{display:'flex',justifyContent:'space-between', flexDirection:'column', height:'100%'}}>

                        <Box>
                          {/* Header */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >

                            <Chip
                              label={
                                booking.status === "confirmed"
                                  ? "Payment Accepted"
                                  : booking.status === "pending"
                                    ? "Awaiting Payment"
                                    : "Refunded"
                              }
                              color={
                                booking.status === "confirmed"
                                  ? "success"
                                  : booking.status === "pending"
                                    ? "primary"
                                    : "error"
                              }
                              sx={{ fontWeight: "bold" }}
                            />
                          </Box>

                          {/* Content */}
                          <Box sx={{ marginBottom: "10px" }}>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Street Address:</strong>{" "}
                              {booking.street_address || "N/A"}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Unit/Apt:</strong> {booking.unit_apt || "N/A"}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Task Details:</strong>{" "}
                              {booking.task_details || "N/A"}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Date:</strong>{" "}
                              {new Date(booking.date).toLocaleDateString() || "N/A"}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Start Time:</strong> {booking.start_time || "N/A"}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Number of Hours:</strong>{" "}
                              {booking.number_of_hours || "N/A"}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Total Amount:</strong> $
                              {booking.total_amount.toFixed(2)}
                            </Typography>
                          </Box>

                        </Box>
                        <Box>
                          <Divider sx={{ marginY: "10px" }} />

                          {/* Footer */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong>Created On:</strong>{" "}
                              {new Date(booking.created_at).toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#555" }}>
                              <strong> Booking ID:  {booking._id}</strong>{" "}

                            </Typography>
                            {/* <Typography variant="subtitle2" sx={{ color: "#555" }}>
                      <strong>Updated At:</strong>{" "}
                      {new Date(booking.updated_at).toLocaleString()}
                    </Typography> */}
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: "10px",
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                textTransform: "none",
                                backgroundColor: "#0066cc",
                                "&:hover": { backgroundColor: "#004a99" },
                              }}
                              // onClick={() => handleOpenDialog(booking)} // Open dialog on click
                              onClick={() => navigate(urls.SHARE_BOOKING_HISTORY, { state: { booking } })} // Navigate to the page
                            >
                              Share
                            </Button>
                          </Box>
                        </Box>

                      </Grid>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" align="center">
                  No bookings found.
                </Typography>
              )}
            </Grid>

            {/* Pagination */}
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>}

        {/* Dialog for Booking Details */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Booking Details</DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <Box>
                <Typography variant="subtitle2">
                  <strong>Booking ID:</strong> {selectedBooking._id}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Street Address:</strong>{" "}
                  {selectedBooking.street_address}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Unit/Apt:</strong> {selectedBooking.unit_apt}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Task Details:</strong> {selectedBooking.task_details}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedBooking.date).toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Start Time:</strong> {selectedBooking.start_time}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Number of Hours:</strong>{" "}
                  {selectedBooking.number_of_hours}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Total Amount:</strong> $
                  {selectedBooking.total_amount.toFixed(2)}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Status:</strong> {selectedBooking.status}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedBooking.created_at).toLocaleString()}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Updated At:</strong>{" "}
                  {new Date(selectedBooking.updated_at).toLocaleString()}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default BookingHistory;
