import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import PendingIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllBookings, getBookingDetails } from "../../services/api/serviceProviderAPIs";
import { setUpcomingBooking, setCompletedBooking, setBookingId, setSelectedServiceType, setTotalRevenue } from "../../store/bookingSlice";
import { useTranslation } from "react-i18next";

const DataGridDemo = () => {
  const { t } = useTranslation(); // Initialize the translation function
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]); // State to store the dynamic rows
  const [loading, setLoading] = useState<boolean>(true); // Optional loading state
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<any | null>(null); // State for booking details
  const bookingAction = useDispatch(); // Dispatch function to trigger booking actions

  const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return formatter.format(new Date(date));
  };

  const handleViewDetails = async (booking: any) => {//+
    console.log("Viewing booking details for:", JSON.stringify(booking));
    const bookingId = booking.bookingId;
    // console.log("Booking : " + bookingId);//-
    const selectedServiceType = booking.serviceType;
    console.log("Service Type:", selectedServiceType);
    bookingAction(setBookingId({ bookingId }));
    bookingAction(setSelectedServiceType({ selectedServiceType }));

    navigate(`/BookingDetails/${bookingId}`);
  };

  
  const columns: GridColDef[] = [
    {
      field: "bookingId",
      headerName: t("table.bookingId"),
      width: 250,
      filterable: false,
    },
    {
      field: "serviceType",
      headerName: t("table.serviceName"),
      width: 150,
      filterable: false,
    },
    {
      field: "date",
      headerName: t("table.date"),
      width: 150,
      filterable: false,
    },
    {
      field: "startTime",
      headerName: t("table.startTime"),
      width: 150,
      filterable: false,
    },
    {
      field: "duration",
      headerName: t("table.duration"),
      width: 150,
      filterable: false,
    },
    {
      field: "amount",
      headerName: t("table.amount"),
      width: 150,
      filterable: false,
    },
    {
      field: "status",
      headerName: t("table.status"),
      width: 180,
      filterable: false,
      renderCell: (params) => {
        const status = params.value;

        // Define custom styles for the Chip
        const chipStyles = {
          pending: {
            backgroundColor: "#faff86", // Yellow background
            color: "#000", // Black text
          },
          confirmed: {
            backgroundColor: "#07b500", // Green background
            color: "#FFF", // White text
          },
          cancelled: {
            backgroundColor: "#e60000", // Red background
            color: "#FFF", // White text
          },
          default: {
            backgroundColor: "#E0E0E0", // Gray background
            color: "#000", // Black text
          },
        };

        const statusKey = (status?.toLowerCase() as keyof typeof chipStyles) || "default";
        const chipStyle = chipStyles[statusKey];

        let icon;
        switch (status?.toLowerCase()) {
          case "pending":
            icon = <PendingIcon sx={{ color: "white" }} />;
            break;
          case "confirmed":
            icon = <DoneIcon />;
            break;
          case "cancelled":
            icon = <CancelIcon />;
            break;
          default:
            icon = <WarningIcon />;
        }

        return (
          <Chip
            label={status}
            icon={icon}
            sx={{
              backgroundColor: chipStyle.backgroundColor,
              color: chipStyle.color,
              fontWeight: "bold",
              border: "none",
              boxShadow: "none",
              width: "120px",
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: t("table.actions"),
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            onClick={() => handleViewDetails(params.row)}
          >
            {t("table.viewDetails")}
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const serviceProviderId =
          sessionStorage.getItem("id") || localStorage.getItem("service_provider_id") || "";

        if (!serviceProviderId) {
          throw new Error("Service Provider ID is required");
        }

        const response = await getAllBookings(serviceProviderId);

        console.log("Response: ", response.data);

        const upcoming_booking = response.data?.metadata?.pendingAndConfirmedBooking || 0;
        const completed_booking = response.data?.metadata?.completedBookings || 0;
        const total_revenue = response.data?.metadata?.total_revenue || 0;

        bookingAction(setUpcomingBooking({ upcoming_booking }));
        bookingAction(setCompletedBooking({ completed_booking }));
        bookingAction(setTotalRevenue({ total_revenue }));
        
        const bookings = response.data?.items?.map((booking: any) => ({
          
          id: t(booking._id),
          bookingId: t(booking._id),
          serviceType: t(booking.serviceTypeName),
          date: formatDate(booking.date),
          startTime: booking.start_time,
          duration: booking.number_of_hours,
          amount: booking.total_amount,
          status: t(booking.status.charAt(0).toUpperCase() + booking.status.slice(1)),
        })) || [];
        setRows(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };



    fetchBookings();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 2, height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableColumnMenu
        loading={loading}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#2293ee",
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
          },
          height: "100%",
        }}
      />
    </Box>
  );
};

export default DataGridDemo;
