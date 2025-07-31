
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/index.tsx";
import { useTranslation } from 'react-i18next';
import { getServiceTypeById } from "../../services/api/customerHomeAPIs.ts";

import axios from "axios";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import routes from "../../constants/routes.json";
import DefaultImage from "../../assets/userProfile.png"

interface ServiceProvider {
  user_id: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  hourly_rate: number;
  service_type: string;
  business_name: string;
  created_at: string;
  profileImage: string;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceProvider[]>([]);
  const [serviceType, setServiceType] = useState<any>({});
  const location = useLocation();
  const { name, service_type_id } = location.state || {}; // Retrieve the name from state
  const navigate = useNavigate();

  const { t } = useTranslation();

  const fetchServiceTypeDetails = async (id: string) => {
    try {
      const serviceType = await getServiceTypeById(id);
      setServiceType(serviceType);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchServiceProviders = async () => {
      const token = localStorage.getItem("AUTH_ACCESS_TOKEN");
      const role = "service-provider";

      try {
        const response = await axios.get(
          `http://localhost:3002/users/?role=${role}&service_type=${name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Access `items` inside `response.data.data.items`
        setServices(response.data.data.items || []);
      } catch (error: any) {
        console.error("Error fetching service providers:", error.response?.data || error.message);
        alert("Failed to fetch service providers. Please try again.");
      }
    };

    fetchServiceProviders(); // Fetch data on component mount
  }, [name]);

  useEffect(() => {
    if (service_type_id) {
      fetchServiceTypeDetails(service_type_id);
    }
  }, [service_type_id]);
  return (
    <React.Fragment>
      <Container sx={{ padding: '0 !important', margin: 0 }} maxWidth="xl">
        {/* Navbar on Top */}
        <NavBar />

        {/* Header Section */}
        <Box
          sx={{
            bgcolor: "#f5f5f5",
            pt: 8,
            pb: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {name || t("serviceProviders.title")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            {t("serviceProviders.description", { name: name || t("serviceProviders.defaultType") })}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={6} display='flex' flexDirection='column' justifyContent='center' textAlign='start' padding="30px">
            {serviceType.data &&
              <>
                <Typography variant="h4" sx={{ fontSize: '13px', fontWeight: "bold", color: '#46a225', mb: 2, textTransform: "uppercase", }}>
                  {serviceType.data.role_type}
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
                  {serviceType.data.description}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {serviceType.data.marketing_text}
                </Typography>
              </>
            }
          </Grid>
          <Grid item xs={12} sm={6} padding='20px'>
            {serviceType.data &&
              <Box
                component="img"
                src={serviceType.data.image}
                alt={serviceType.data.name}
                sx={{
                  width: "100%",
                  height: "400px", // Adjusted height for consistency
                  borderRadius: 1,
                  objectFit: "cover", // Ensures the image is properly fitted
                }}
              />}
          </Grid>
        </Grid>
        {/* Service Providers Section */}
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            {t("serviceProviders.topProviders")}
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {services.length > 0 ? (
              services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.user_id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      mx: "auto",
                      borderRadius: 2,
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="160"
                        image={service.profileImage || DefaultImage} // Dynamically display service image or fallback to default
                        alt={service.service_type || t("serviceProviders.defaultImageAlt")} // Set alternative text
                        sx={{
                          objectFit: "contain", // Ensures the image fits within the container
                          borderRadius: "16px", // Adjust border radius for rounded corners
                          overflow: "hidden", // Ensure rounded corners are clipped
                          border: "1px solid #ddd", // Optional: Add a subtle border
                          backgroundColor: "#f8f8f0", // Optional: Background color for contrast
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {`${service.firstname} ${service.lastname}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t("serviceProviders.hourlyRate", {
                            rate: service.hourly_rate || t("serviceProviders.na"),
                          })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {t("serviceProviders.address", {
                            address: service.address || t("serviceProviders.noAddress"),
                          })}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 2,
                          }}
                        >
                          {/* <Button
                            variant="contained"
                            size="small"
                            sx={{ bgcolor: "primary.main", color: "white" }}
                            onClick={() => alert(t("serviceProviders.viewProfileAlert"))}
                          >
                            {t("serviceProviders.viewProfile")}
                          </Button> */}
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ bgcolor: "success.main", color: "white", width: '90%' }}
                            onClick={() =>
                              navigate(routes.PARTNER_BOOKING, {
                                replace: true,
                                state: {
                                  id: service.user_id,
                                  hourly_rate: service.hourly_rate,
                                  service_type: service.service_type,
                                  service_type_id: service_type_id,
                                },
                              })
                            }
                          >
                            {t("serviceProviders.book")}
                          </Button>
                          {/* <Button
                            variant="contained"
                            size="small"
                            sx={{ bgcolor: "info.main", color: "white" }}
                            onClick={() => alert(t("serviceProviders.reviewAlert"))}
                          >
                            {t("serviceProviders.review")}
                          </Button> */}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center" sx={{ mt: 3, mx: "auto" }}>
                {t("serviceProviders.noProviders", { name: name })}
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ServicesPage;
