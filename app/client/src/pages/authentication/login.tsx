// App.tsx
import React, { useState, useContext, useMemo } from 'react';
import {
    Box,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/button/index';
import Textfield from '../../components/textfield';
import googleLogin from '../../assets/icons/login/google.svg';
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes.json";
import { LoginApi, RegisterCustomerAPI, RegisterPartnersAPI } from '../../services/api/authAPIs';
import CustomisedSnackbar from '../../components/snackbar';
import { LoginContext } from './loginContext';
import ArrowRightIcon from '../../assets/icons/arrows/arrowRightLogin.svg';
import Icon from '../../components/icon';
import CustomerLoginImg from '../../assets/login_customer.png';
import PartnersImg from '../../assets/partners.png';
import { getUserData } from "../../services/api/authAPIs.ts";

const handleGoogleLogin = () => {
    console.log('Google login clicked');
};

const SignupPage: React.FC = () => {
    const loginContext = useContext(LoginContext);
    const navigate = useNavigate();
    const [registerMode, setRegisterMode] = useState('login');
    const [mode, setMode] = useState('customer');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const contextValues = useMemo(
        () => ({
            ...loginContext,
            mode, setMode,
            email,
            setEmail,
            firstName, setFirstName, lastName, setLastName,
            setRegisterMode,
            registerMode,
            setOpenSnackbar,
            setSnackbarMessage,
        }),
        [
            email,
            mode, setMode,
            setEmail, firstName, setFirstName, lastName, setLastName,
            loginContext,
            registerMode,
            setRegisterMode,
            setOpenSnackbar,
            setSnackbarMessage,
        ]
    );


    React.useEffect(() => {
        // Extract the `token` parameter
        const token = localStorage.getItem("AUTH_ACCESS_TOKEN");

        if (token) {
            // Store the token in localStorage
            // Fetch all service types on page load
            getUserData().then((res) => {
                sessionStorage.setItem("email", res.data.user.email);
                sessionStorage.setItem("role", res.data.user.role);
                sessionStorage.setItem("id", res.data.user._id);
                navigate(routes.CUSTOMER_HOME, { replace: true });
            });            
        }
    }, []);

    return (
        <React.Fragment>
            <LoginContext.Provider value={contextValues}>
                <CustomisedSnackbar
                    open={openSnackbar}
                    message={snackbarMessage}
                    clickHandler={() => setOpenSnackbar(false)}
                    onClose={() => setOpenSnackbar(false)}
                />
                <Grid container sx={{ height: "100vh" }}>
                    {/* Left Side with Image */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                            padding: 3,
                            height: "100%",
                            alignItems: "center",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{
                                    x: mode === 'partner' ? 10 : -10,
                                    opacity: 0
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: mode === 'partner' ? 10 : -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {mode === 'partner' &&
                                    <Box>
                                        <img src={PartnersImg} alt="placeholder" width={600} />
                                    </Box>
                                }
                                {mode === 'customer' &&
                                    <Box>
                                        <img src={CustomerLoginImg} alt="placeholder" width={600} />
                                    </Box>
                                }
                            </motion.div>
                        </AnimatePresence>
                    </Grid>

                    {/* Right Side with Form */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#f7f9fc",
                            padding: 3,
                            height: "100%",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={registerMode}
                                initial={{
                                    x: registerMode === 'register' ? 10 : -10,
                                    opacity: 0
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: registerMode === 'register' ? 10 : -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {registerMode === 'register' && <Register />}
                                {registerMode === 'login' && <Login />}
                            </motion.div>
                        </AnimatePresence>
                    </Grid>
                </Grid>
            </LoginContext.Provider>
        </React.Fragment>
    );
};


const Register: React.FC = () => {
    const loginContext = useContext(LoginContext);
    const { email, setEmail, firstName, setFirstName, lastName, setLastName, setOpenSnackbar, setSnackbarMessage, setRegisterMode, mode, setMode } = loginContext;
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleRegister = async () => {
        const bodyParameters = {
            firstName,
            lastName,
            email,
        };
        try {
            if (!(email && firstName && lastName)) {
                setOpenSnackbar(true);
                setSnackbarMessage('Please enter all the required information to register');
                return;
            }
            if (!validateEmail(email)) {
                setOpenSnackbar(true);
                setSnackbarMessage('Please enter a valid email address');
                return;
            }

            const response = mode == 'customer' ? await RegisterCustomerAPI(bodyParameters) : await RegisterPartnersAPI(bodyParameters);
            console.log("Registration response:", response);
            if (response.status === 201) {
                setOpenSnackbar(true);
                setSnackbarMessage('Registration successful! Please sign in with your email');
                setRegisterMode('login');
            }
        } catch (error: any) {
            console.log("Registration response:", error);
            setOpenSnackbar(true);
            //   console.log("Error: ", error.response.data.error);
            setSnackbarMessage(error?.response?.data?.error || 'Registration failed');

        }
    };

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            handleRegister();
          }
        };
    
        // Attach the event listener
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleRegister]);

    React.useEffect(() => {
        // Get the current URL
        const url = new URL(window.location.href);

        // Extract the `token` parameter
        const token = url.searchParams.get("token");

        if (token) {
            // Store the token in localStorage
            localStorage.setItem("AUTH_ACCESS_TOKEN", token);

            // Remove the token from the URL
            url.searchParams.delete("token");
            window.history.replaceState({}, "", url.toString());
            navigate(routes.CUSTOMER_HOME, { replace: true });
            console.log("Token stored and removed from URL");
        }
    }, []);

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 300,
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome!
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 3 }}>
                    Create your account
                </Typography>

                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: '300px'
                }}>
                    {/* Email Field */}
                    <Textfield
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your email"
                        type="email"
                        width="300px"
                        height="35px"
                        borderRadius="6px"
                        margin="0 0 10px 0"
                    />
                    <Textfield
                        label="First Name"
                        value={firstName}
                        onChange={setFirstName}
                        placeholder="Enter your firstname"
                        type="name"
                        width="300px"
                        height="35px"
                        margin="0 0 10px 0"
                        borderRadius="6px"
                    />
                    <Textfield
                        label="Last Name"
                        value={lastName}
                        onChange={setLastName}
                        placeholder="Enter your lastname"
                        type="name"
                        width="300px"
                        height="35px"
                        margin="0 0 10px 0"
                        borderRadius="6px"
                    />
                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        text="Register"
                        onClick={() => handleRegister()}
                        width="300px"
                        height="38px"
                        borderRadius="8px"
                        borderColor="#1976d2"
                        backgroundColor="#f0f8ff"
                        hoverColor="#e6f3ff"
                        sx={{ mt: 2, mb: 1 }}
                    />
                </Box>
                <Box>
                    <Grid container spacing={1} sx={{ mt: 1.8 }}>
                        <Grid item xs={12} mb={'42px'} maxHeight="32px">
                            <Box>
                                <Typography
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    variant="h2"
                                    sx={{
                                        height: '32px',
                                        '@media (max-width: 430px)': {
                                            height: '40px'
                                        }
                                    }}
                                >
                                    Already Signed Up?
                                    <Typography
                                        component="div"
                                        sx={{
                                            paddingLeft: '10px',
                                            color: '#6473FF',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            fontSize: '14px',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                        onClick={() => {
                                            // clearUserDetailsForm();
                                            setRegisterMode('login');
                                        }}
                                    >
                                        Login
                                        <Icon rowType="experimentRow" src={ArrowRightIcon} alt="ArrowRightIcon" />
                                    </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Grid item xs={12} mb={'42px'} maxHeight="32px">
                    <Box>
                        <Typography
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                            variant="h2"
                            sx={{
                                height: '32px',
                                '@media (max-width: 430px)': {
                                    height: '40px'
                                }
                            }}
                        >
                            <Typography
                                component="div"
                                sx={{
                                    paddingLeft: '8px',
                                    color: '#6473FF',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                                onClick={() => {
                                    setFirstName('');
                                    setLastName('');
                                    if (mode === 'customer') {
                                        setMode('partner');
                                    } else {
                                        setMode('customer');
                                    }
                                }}
                            >

                                Sign in as {mode == 'customer' ? 'partner' : 'customer'}
                                <Icon rowType="experimentRow" src={ArrowRightIcon} alt="ArrowRightIcon" />
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

const Login: React.FC = () => {
    const loginContext = useContext(LoginContext);
    const { email, setEmail, setOpenSnackbar, setSnackbarMessage, setRegisterMode, setLastName, setFirstName, mode, setMode } = loginContext;
    const navigate = useNavigate();

    window.onpopstate = () => {
        setRegisterMode('login');
    };

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleEmailSignIn = async () => {
        if (!email) {
            setOpenSnackbar(true);
            setSnackbarMessage('Please enter your email address');
            return;
        } else if (validateEmail(email) === false) {
            setOpenSnackbar(true);
            setSnackbarMessage('Please enter a valid email address');
            return;
        }
        try {
            const response = await LoginApi(email);
            if (response.status === 200) {
                setOpenSnackbar(true);
                setSnackbarMessage('A login link has been sent to your registered email address. Please check your inbox.');
                console.log("Login successful:", response);
            }
        } catch (err: any) {
            setOpenSnackbar(true);
            setSnackbarMessage(err?.response?.data?.message || 'Failed to sign in. Please try again');
        }
    };

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            handleEmailSignIn();
          }
        };
    
        // Attach the event listener
        window.addEventListener('keydown', handleKeyDown);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleEmailSignIn]);

    React.useEffect(() => {
        // Get the current URL
        const url = new URL(window.location.href);

        // Extract the `token` parameter
        const token = url.searchParams.get("token");

        if (token) {
            // Store the token in localStorage
            localStorage.setItem("AUTH_ACCESS_TOKEN", token);

            // Remove the token from the URL
            url.searchParams.delete("token");
            window.history.replaceState({}, "", url.toString());
            navigate(routes.CUSTOMER_HOME, { replace: true });
        }
    }, []);

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 300,
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome!
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 3 }}>
                    Log in to your account
                </Typography>

                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: '300px'
                }}>
                    {/* Email Field */}
                    <Textfield
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your email"
                        type="email"
                        width="300px"
                        height="35px"
                        borderRadius="6px"
                        borderColor={false ? 'red' : '#1976d2'}
                    />

                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        text="Login"
                        onClick={() => handleEmailSignIn()}
                        width="300px"
                        height="38px"
                        borderRadius="8px"
                        borderColor="#1976d2"
                        backgroundColor="#f0f8ff"
                        hoverColor="#e6f3ff"
                        sx={{ mt: 2, mb: 1 }}
                    />

                    <Divider>or</Divider>

                    {/* Social Login Buttons */}
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<img src={googleLogin} alt="google" />}
                            text="Continue with Google"
                            onClick={handleGoogleLogin}
                            width="300px"
                            height="38px"
                            borderRadius="8px"
                            borderColor="#4285F4"
                            backgroundColor="#ffffff"
                            hoverColor="#f8f8f8"
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </Box>
                <Grid item xs={12} mb={'42px'} maxHeight="32px">
                    <Box>
                        <Typography
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            variant="h2"
                            sx={{
                                height: '32px',
                                '@media (max-width: 430px)': {
                                    height: '40px'
                                }
                            }}
                        >
                            Don&apos;t have an account?
                            <Typography
                                component="div"
                                sx={{
                                    paddingLeft: '8px',
                                    color: '#6473FF',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                                onClick={() => {
                                    setFirstName('');
                                    setLastName('');
                                    setRegisterMode('register');
                                }}
                            >
                                Sign up
                                <Icon rowType="experimentRow" src={ArrowRightIcon} alt="ArrowRightIcon" />
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} mb={'42px'} maxHeight="32px">
                    <Box>
                        <Typography
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                            variant="h2"
                            sx={{
                                height: '32px',
                                '@media (max-width: 430px)': {
                                    height: '40px'
                                }
                            }}
                        >
                            <Typography
                                component="div"
                                sx={{
                                    paddingLeft: '8px',
                                    color: '#6473FF',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                                onClick={() => {
                                    setFirstName('');
                                    setLastName('');
                                    if (mode === 'customer') {
                                        setMode('partner');
                                    } else {
                                        setMode('customer');
                                    }
                                }}
                            >

                                Sign in as {mode == 'customer' ? 'partner' : 'customer'}
                                <Icon rowType="experimentRow" src={ArrowRightIcon} alt="ArrowRightIcon" />
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

export default SignupPage;