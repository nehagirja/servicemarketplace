import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FailurePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ textAlign: "center", padding: 3 }}
        >
            <Typography variant="h4" gutterBottom color="error">
                Payment Failed
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
                Unfortunately, your payment could not be processed. Please try again later.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")} // Navigate back to home or another page
            >
                Try Again
            </Button>
        </Box>
    );
};

export default FailurePage;
