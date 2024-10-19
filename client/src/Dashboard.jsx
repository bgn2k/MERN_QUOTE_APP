import React from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
export const Dashboard = () => {
  const location = useLocation();
  const { userName } = location.state || {};
  const navigate = useNavigate();
  function handleSignOut() {
    navigate("/login");
  }
  return (
    <>
      <div>
        <h2>Hello {userName}!</h2>
      </div>
      <div>
        <Button variant="contained" onClick={() => handleSignOut()}>
          Sign Out
        </Button>
      </div>
    </>
  );
};
