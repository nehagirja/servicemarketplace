import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Navbar from "../../components/navbar/index.tsx";
import routes from "../../constants/routes.json";

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <Navbar />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                // height="100%"
                sx={{
                    height: 'calc(100vh - 64px)', // Adjust the height dynamically (subtract Navbar height)
                    textAlign: 'center',
                    padding: 3,
                }}
            >
                <Typography variant="h4" fontWeight={800} gutterBottom>
                    {t('shareBooking.PaymentSuccessful')}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    {t('shareBooking.PaymentSuccessfulMessage')}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(routes.BOOKING_HISTORY)} // Navigate back to home or another page
                >
                    {t('shareBooking.viewBookings')}
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default SuccessPage;
