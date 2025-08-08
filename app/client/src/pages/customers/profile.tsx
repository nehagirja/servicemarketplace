import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
  TextField,
  Box,
  Avatar
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ResponsiveAppBar from "../../components/navbar/index.tsx"; // Navbar component for consistent app navigation
import InputField from "../../components/textfield/index.tsx"; // Custom TextField component
import CardContainer from "../../components/card/CardContainer.tsx"; // Card layout component for better UX
import {
  getUserProfile,
  updateProfileAPI,
} from "../../services/api/profileAPIs"; // API functions for fetching and updating user profile
import CustomisedSnackbar from '../../components/snackbar';
import { useTranslation } from 'react-i18next';
import { getBatchServiceTypes } from "../../services/api/customerHomeAPIs.ts"; // Assuming this is the path to your API file
import countryCodes from '../../constants/countryCodes.json'; // Adjust the path as needed
import Loader from "../../components/loader/index.tsx"; // Loading spinner component

type Service = {
  id: string;
  name: string;
};

const ProfilePage: React.FC = () => {
  // State to store user data and form inputs
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    pin: "",
    state: "",
    country: "",
    role: "",
    service_type: "",
    profileImage: "",
    hourly_rate:""
  });
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview


  // Loading and feedback states
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [inputValue, setInputValue] = useState('');
  const countries = Object.values(countryCodes);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // Check for size > 10MB
        setOpenSnackbar(true);
        setSnackbarMessage('File size exceeds the 10MB limit. Please choose a smaller file.');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Update image preview
        setFormData((prev) => ({ ...prev, profileImage: reader.result as string })); // Update formData
      };
    }
  };

  const fetchAllServices = async () => {
    setLoading(true);

    try {
      // Fetch all services (pass an empty query or use a specific API for all services)
      const response = await getBatchServiceTypes({ serviceType: "" });
      // Map the response to match the Service type structure
      const mappedServices = response.data.map((service: any) => ({
        id: service._id,
        name: service.role_type
      }));
      setServices(mappedServices); // Populate the cards with all services
    } catch (error) {
      console.error("Error fetching all services:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get user ID from session storage
        const id = sessionStorage.getItem("id");

        // If user ID exists, fetch the profile
        if (id) {
          const response = await getUserProfile(id); // API call to fetch user profile

          // Update state with fetched data
          setUserData(response.data);
          setFormData({
            ...formData,
            firstName: response.data.firstname || "",
            lastName: response.data.lastname || "",
            phoneNumber: response.data.phoneNumber?.toString() || "",
            address: response.data.address || "",
            pin: response.data.pin?.toString() || "",
            state: response.data.state || "",
            country: response.data.country || "",
            role: response.data.role || "",
            service_type: response.data.service_type || "",
            profileImage: response.data.profileImage || "",
            hourly_rate: response.data.hourly_rate?.toString() || "",
          });

          if (response.data.profileImage) {
            setImagePreview(response.data.profileImage);
          }

          // Call fetchAllServices if the role is 'service-provider'
          if (response.data.role === "service-provider") {
            fetchAllServices();
          }

        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchAllServices();
    fetchUserProfile(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  // Handle input field changes
  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the corresponding form field
    });
  };

  const handleDeleteImage = async () => {
    setImagePreview(null); // Clear the preview
    setFormData((prev) => ({ ...prev, profileImage: "" })); // Remove from formData

    // Optional: Call an API to delete the image on the backend
    try {
      const response = await updateProfileAPI(userData.user_id, { profileImage: "" });
      if (response) {
        console.log("Profile image deleted!");
      }
    } catch (error) {
      console.error("Error deleting profile image:", error);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    setLoading(true); // Show loading indicator
    setSuccessMessage(""); // Reset success message
    setErrorMessage(""); // Reset error message

    try {
      // Ensure user data and ID are loaded
      if (!userData || !userData.user_id) {
        setOpenSnackbar(true);
        setSnackbarMessage('User data not found');
      }

      // API call to update the user profile
      updateProfileAPI(userData.user_id, formData).then((response: any) => {
        console.log("Response:", response);
        if (response.message === "User details updated Successfully") {
          setOpenSnackbar(true);
          setSnackbarMessage('Profile updated successfully');
        }
      });
    } catch (error: any) {
      // Handle errors during profile update
      setOpenSnackbar(true);
      setSnackbarMessage('Failed to update profile');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Show loading spinner if user data hasn't loaded yet
  return (
    <>
      {/* Navbar */}
      <ResponsiveAppBar />

      <CustomisedSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        clickHandler={() => setOpenSnackbar(false)}
        onClose={() => setOpenSnackbar(false)}
      />
      {loading? 
      <Loader isFetching={loading} />
      :      
      <Container>
        {/* Card layout for profile form */}
        <CardContainer background='#f8f8f0'>
          <Typography variant="h2" align="center" style={{ marginBottom: "1rem" }}>
              {t("profile.title")}
            </Typography>
          {/* Profile Image Upload */}
          <Box display="flex" flexDirection="column" alignItems="center" marginBottom={3}>
            {imagePreview ? (
              <>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Profile Preview"
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 2,
                  }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleDeleteImage}
                  sx={{ marginBottom: 2 }}
                >
                  {t("profile.deleteImage")}
                </Button>
              </>
            ) : (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: "rgba(0, 0, 0, 0.1)", // Light gray background
                  color: "rgba(0, 0, 0, 0.6)",   // Muted icon color
                  marginBottom: 2,
                }}
              >
                <PersonIcon sx={{ fontSize: 80 }} /> {/* Icon size adjusted */}
              </Avatar>
            )}
            <Button variant="outlined" component="label">
              {t(imagePreview ? "profile.updateImage" : "profile.uploadImage")}
              <input type="file" accept="image/*" hidden onChange={onFileChange} />
            </Button>
          </Box>
          {/* Input fields for profile details */}
          <InputField
            // disabled
            label={t("profile.firstName")}
            value={formData.firstName}
            borderRadius="8px"
            onChange={(value) => handleInputChange("firstName", value)}
            placeholder={t("profile.firstNamePlaceholder")}
          />
          <InputField
            // disabled
            label={t("profile.lastName")}
            value={formData.lastName}
            borderRadius="8px"
            onChange={(value) => handleInputChange("lastName", value)}
            placeholder={t("profile.lastNamePlaceholder")}
          />
          <InputField
            label={t("profile.phoneNumber")}
            value={formData.phoneNumber}
            borderRadius="8px"
            onChange={(value) => handleInputChange("phoneNumber", value)}
            placeholder={t("profile.phoneNumberPlaceholder")}
          />
          {formData.role === "service-provider" && (
          <InputField
            label={t("profile.hourlyRate")}
            value={formData.hourly_rate}
            borderRadius="8px"
            onChange={(value) => handleInputChange("hourly_rate", value)}
            placeholder={t("profile.hourlyRatePlaceholder")}
          />)}
          <InputField
            label={t("profile.address")}
            value={formData.address}
            borderRadius="8px"
            onChange={(value) => handleInputChange("address", value)}
            placeholder={t("profile.addressPlaceholder")}
          />
          <InputField
            label={t("profile.pin")}
            value={formData.pin}
            borderRadius="8px"
            onChange={(value) => handleInputChange("pin", value)}
            placeholder={t("profile.pinPlaceholder")}
          />
          <InputField
            label={t("profile.state")}
            value={formData.state}
            borderRadius="8px"
            onChange={(value) => handleInputChange("state", value)}
            placeholder={t("profile.statePlaceholder")}
          />
          <Autocomplete
            freeSolo
            options={countries}
            inputValue={inputValue}
            value={formData.country || null}
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue); // Update the input value
            }}
            onChange={(_, newValue) => {
              handleInputChange('country', newValue || ''); // Update the formData state
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                placeholder="Type or select a country"
                autoComplete="off" // Disable Google autofill
                sx={{
                  marginTop: '15px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px', // Match your existing styling
                    fontSize: '14px', // Ensure consistent font size
                    color: '#000',
                    padding: '3px 5px', // Remove default padding
                    '& input': {
                      // padding: '3px 5px', // Add padding for input text
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px', // Label font size
                    color: '#000',
                    transform: 'translate(8px, 10px) scale(1)', // Align label with input
                  },
                  '& .MuiInputLabel-shrink': {
                    transform: 'translate(14px, -6px) scale(0.75)', // Align label when shrunk
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(48, 48, 103, 0.5)', // Match input field border
                  },
                }}
              />
            )}
            PaperComponent={({ children }) => (
              <div
                style={{
                  marginTop: '4px', // Ensure the dropdown appears below the input
                  borderRadius: '8px', // Match the dropdown's border radius to the input
                  border: '1px solid rgba(48, 48, 103, 0.5)', // Match input field border
                  backgroundColor: '#fff',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for dropdown
                }}
              >
                {children}
              </div>
            )}
            sx={{
              '& .MuiAutocomplete-popupIndicator': {
                display: 'none', // Optional: hide the dropdown indicator if not needed
              },
              '& .MuiAutocomplete-listbox': {
                maxHeight: '200px', // Limit dropdown height
                overflow: 'auto', // Enable scrolling for long lists
              },
              '& .MuiAutocomplete-option': {
                padding: '8px 14px', // Adjust padding for dropdown items
                fontSize: '14px', // Match input font size
              },
            }}
          />





          {/* Service Type Dropdown */}
          {formData.role === "service-provider" && (
            <FormControl
              fullWidth
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 9px) scale(1)', // Align label with dropdown
                  fontSize: '14px', // Optional: match input field font size
                  color: '#000'
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translate(14px, -8px) scale(0.75)', // Shrink when focused
                },
                '& .MuiSelect-select': {
                  padding: '7px 14px', // Ensure content is aligned with label
                  fontSize: '14px', // Optional: match input field font size
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(48, 48, 103, 0.5)', // Optional: match input field border
                  borderRadius: '8px', // Optional: match input field border radius
                },
              }}
            >
              <InputLabel id="serviceTypeLabel">Service Type</InputLabel>
              <Select
                labelId="serviceTypeLabel"
                id="serviceType"
                name="service_type"
                value={formData.service_type}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                label="Service Type"
              >
                <MenuItem value="" disabled>
                  Select Service Type
                </MenuItem>
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.name}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>)}
          {/* Button to submit profile update */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? t("profile.updating") : t("profile.updateProfile")}
          </Button>

          {/* Display success or error messages */}
          {successMessage && (
            <Typography color="success" style={{ marginTop: "1rem" }}>
              {t("profile.updateSuccess")}
            </Typography>
          )}
          {errorMessage && (
            <Typography color="error" style={{ marginTop: "1rem" }}>
              {t("profile.updateError")}
            </Typography>
          )}
        </CardContainer>
      </Container>
      }
    </>
  );
};

export default ProfilePage;