import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from '@mui/material/Button';
import './auth.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button id='auth-button' onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;