import React, { useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Paper,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import NavBar from "../../components/navbar/index.tsx";
import { useNavigate } from "react-router-dom";

import routes from "../../constants/routes.json";


// Initialize Stripe with the publishable key

const stripePromise: Promise<Stripe | null> = loadStripe(
  "pk_test_51QNlBqBhwWVqOPIEOVEhW42AyQxnyDlwnEwsz7mV9EtVzwm6gMRBFqNSxsCqFSrbM4gASUTHd1WvhY6Yuk8HBAU8008wGRAIJy"
);

const PaymentPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { paymentAmount } = location.state || {};
  //const [amount, setAmount] = paymentAmount;
  const [amount, setAmount] = useState<number>(paymentAmount || 0);
  // const [email, setEmail] = useState<string>("");
  const email = sessionStorage.getItem("email");
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  // const [success, setSuccess] = useState<string | null>(null);
  let success;

  // const location = useLocation();
  // const { paymentAmount } = location.state || {};

  // Handle the payment
  const navigate = useNavigate();

  const handleMakePayment = async () => {
    if (!stripePromise) {
      setError("Stripe is not initialized.");

      return;
    }

    if (amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      const stripe = await stripePromise;

      // Request body
      const body = {
        email,
        amount, // Amount in smallest currency unit (cents for USD)
      };

      // Make API request to create a checkout session
      const response = await fetch(
        "http://localhost:3002/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment session.");
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Payment error:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <PaymentWrap>

        <Paper elevation={3} sx={{ padding: '32px 20px 10px 20px', width: "100%", maxWidth: 500 }}>
          <Typography variant="h3" gutterBottom marginBottom='20px'>
            {t('shareBooking.confirm-payment')}
          </Typography>

          <TextField
            label="Amount (in USD)"
            type="number"
            fullWidth
            value={amount}
            InputProps={{
              readOnly: true, // Prevent user from editing
            }}
            onChange={(e) => setAmount(Number(e.target.value))} // Allow editing the amount
            sx={{ marginBottom: 2 }}
          />

          {/* <TextField
    label="Email Address"
    type="email"
    fullWidth
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    sx={{ marginBottom: 2 }}
  /> */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              {success}
            </Alert>
          )}

          <Grid container justifyContent='space-between'>
            <Grid item xs={5}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleMakePayment}
                disabled={loading}
                fullWidth
                sx={{ marginBottom: "16px" }} // Adds space below this button
              >
                {loading ? <CircularProgress size={24} /> : "Make Payment"}
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Tooltip title="Cancelling will redirect you to the service page to start the booking again">
              <Button
                variant="contained"
                sx={{ backgroundColor: "#F1F1F6", color:'#000', marginBottom: "16px" }}
                onClick={()=>navigate(routes.SERVICES)}
                disabled={loading}
                fullWidth
              >
                Cancel Payment
              </Button>
                </Tooltip>
              
            </Grid>
          </Grid>
          {/* <Button
    variant="contained"
    sx={{
      backgroundColor: "#007bff",
      color: "white",
      width: "48%",
      "&:hover": { backgroundColor: "#0056b3" },
    }}
    onClick={handleWebShare}
  >
    Share
  </Button> */}
        </Paper>
      </PaymentWrap>

    </React.Fragment>
  );
};

// Styled Component for layout

const PaymentWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 64px)",
  padding: "20px",
});

export default PaymentPage;
