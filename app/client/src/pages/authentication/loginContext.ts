import * as React from 'react';

interface LoginContextType {
  setMode: (mode: string) => void;
  setRegisterMode: (mode: string) => void;
  setSnackbarMessage: (message: string) => void;
  setOpenSnackbar: (open: boolean) => void;
  setOpenLoader: (open: boolean) => void;
  setEmail: (email: string) => void;
  email: string;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  mode: string;
  registerMode: string;
  openSnackbar: boolean;
  snackbarMessage: string;
  openLoader: boolean;
}

const defaultContext: LoginContextType = {
  setMode: () => {
    // This is setMode
  },
  setRegisterMode: () => {
    // This is for register subpages
  },
  setSnackbarMessage: () => {
    // This is setSnackbarMessage
  },
  setOpenSnackbar: () => {
    // This is setOpenSnackbar
  },
  setOpenLoader: () => {
    // This is setOpenLoader
  },
  setEmail: () => {
    // This is setEmail
  },
  email: '',
  firstName: '',
  setFirstName: () => {
    // This is setUsername
  },
  lastName: '',
  setLastName: () => {},
  mode: '',
  registerMode: '',
  openSnackbar: false,
  snackbarMessage: '',
  openLoader: false
};

export const LoginContext = React.createContext<LoginContextType>(defaultContext);