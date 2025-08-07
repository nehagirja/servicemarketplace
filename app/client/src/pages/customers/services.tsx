import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/index.tsx";
import "./home.css";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
// import Tooltip from "@mui/material/Tooltip";
import { getBatchServiceTypes } from "../../services/api/customerHomeAPIs.ts"; // Assuming this is the path to your API file
import { getUserData } from "../../services/api/authAPIs.ts";
import routes from "../../constants/routes.json";
import { useNavigate } from "react-router-dom";
// import Textfield from "../../components/textfield/index.tsx";
import Loader from "../../components/loader/index.tsx";
import { useTranslation } from 'react-i18next';
import Footer from "../../components/footer/index.tsx";

// Define the structure of the Service type based on the API response
type Service = {
  id: string;
  name: string;
  description: string;
  card_image: string;
};

const Services: React.FC = () => {
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  // const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To show loading indicator while fetching
  const navigate = useNavigate();
  
  const { t } = useTranslation();
  React.useEffect(() => {
    const token = localStorage.getItem("AUTH_ACCESS_TOKEN");
    if (token) {
      // Fetch all service types on page load
      getUserData().then((res) => {
        sessionStorage.setItem("email", res.data.user.email);
        sessionStorage.setItem("role", res.data.user.role);
        sessionStorage.setItem("firstName", res.data.user.firstName);
        sessionStorage.setItem("lastName", res.data.user.lastName);
        sessionStorage.setItem("id", res.data.user._id);
      });
    }
  }, []);


  const fetchAllServices = async () => {
    setLoading(true);

    try {
      // Fetch all services (pass an empty query or use a specific API for all services)
      const response = await getBatchServiceTypes({ serviceType: "" });

      // Map the response to match the Service type structure
      const mappedServices = response.data.map((service: any) => ({
        id: service._id,
        name: service.role_type,
        description: service.description,
        card_image: service.card_image,
      }));

      setServices(mappedServices); // Populate the cards with all services
    } catch (error) {
      console.error("Error fetching all services:", error);
    } finally {
      setLoading(false);
    }
  };

  interface ServiceProvider {
    name: string;
    id: string;
  }

  const fetchAllServiceProvider = async (service: ServiceProvider): Promise<void> => {
    navigate(routes.SERVICES_PROVIDERS, {
      state: {
        name: service.name,
        service_type_id: service.id // Passing service.id to the next page
      },
    });
  };

  useEffect(() => {
    // Fetch all services on initial load
    fetchAllServices();
  }, []);

  return (
    <React.Fragment>
      <div className="landing-page">
        <NavBar />
        {loading? 
      <Loader isFetching={loading} width="100%" position="relative" height="100vh" />
    
    :
        <>
        <Typography textAlign='start' variant='h3' style={{ fontSize:'36px', color:"#4285f4", padding: '50px 0px 25px 120px' }}>
          {t('Services')}
          </Typography>
        <div className="search-container">
        {/* <Textfield
                        label=""
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder={t('Search for services...')}
                        type="text"
                        width="300px"
                        height="35px"
                        margin="0 0 10px 0"
                        borderRadius="6px"
                    /> */}
          {/* <input
            type="text"
            className="search-input"
            placeholder={t('Search for services...')}
            value={searchQuery}
            onChange={handleSearchChange}
          /> */}
          {/* {loading && <div className="loading">Loading...</div>} //Show loading indicator */}
          {/* {searchQuery && filteredServices.length > 0 && (
            <ul className="dropdown">
              {filteredServices.map((service) => (
                <li key={service.id} className="dropdown-item">
                  {service.name}
                </li>
              ))}
            </ul>
          )} */}
        </div>
        <div className="services-list">
          {loading
            ? [...Array(8)].map((_, index) => (
              <Card
                sx={{ mx: 2, width: "400px" }}
                key={index}
              >
                <CardContent>
                  {/* Skeleton for the image */}
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "150px",
                      borderRadius: 1,
                      backgroundColor: "#e0e0e0",
                    }}
                  />

                  <Skeleton
                    variant="text"
                    sx={{
                      width: "60%",
                      height: "32px",
                      marginTop: 2,
                      borderRadius: 1,
                    }}
                  />

                  <Skeleton
                    variant="text"
                    sx={{
                      width: "80%",
                      height: "20px",
                      marginTop: 1,
                      borderRadius: 1,
                    }}
                  /><Skeleton
                    variant="text"
                    sx={{
                      width: "80%",
                      height: "20px",
                      marginTop: 1,
                      borderRadius: 1,
                    }}
                  />
                </CardContent>
              </Card>
            ))
            : services.length > 0 && (
              services.map((service) => (
                // <Tooltip title={service.description} key={service.id}>
                  <Card
                    className="service-card-customer"
                    sx={{
                      mx: 2,
                      maxWidth: "400px",
                      ":hover": {
                        cursor: "pointer",
                        transform: "scale(1.01)",
                        transition: "transform 0.2s",
                      },
                    }}
                    onClick={() => fetchAllServiceProvider(service)}
                  >
                    <CardContent
                      sx={{
                        padding: "15px !important",
                      }}
                    >
                      {/* Image Section */}
                      <Box
                        component="img"
                        src={service.card_image} // Make sure `card_image` exists in your service object
                        alt={service.name}
                        sx={{
                          width: "100%",
                          height: "250px", // Adjusted height for consistency
                          borderRadius: 1,
                          objectFit: "cover", // Ensures the image is properly fitted
                        }}
                      />

                      {/* Name Section */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mt: 2,
                          whiteSpace: "nowrap", // Optional: Prevents text wrapping
                          overflow: "hidden",
                          textOverflow: "ellipsis", // Optional: Adds ellipsis for long names
                        }}
                      >
                        {service.name}
                      </Typography>

                      {/* Description Section */}
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          height: "50px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                // </Tooltip>
              ))
            )}
        </div>
        </> }       
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Services;
