import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BasicCard from './BasicCard'; // Import the updated BasicCard component
import {useSelector } from'react-redux'; // Import useSelector hook
import { useTranslation } from "react-i18next";

export default function CardGridWithSpacing() {
  const { t } = useTranslation(); // Initialize the translation function
  const {total_booking, upcoming_booking, completed_booking, total_revenue} = useSelector((state: any) => state.booking); // Get total bookings from Redux store
  // Data for the cards

  const totalRevenue = "$" + total_revenue;
  const cardData = [
    { title: t("cardData.upcomingBooking"), description: upcoming_booking },
    { title: t("cardData.pastBookings"), description: completed_booking || 0 },
    { title: t("cardData.totalBookings"), description: total_booking },
    { title: t("cardData.totalRevenue"), description: totalRevenue },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        {cardData.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <BasicCard title={data.title} description={data.description} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
