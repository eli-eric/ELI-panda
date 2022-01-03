import React from "react";
import Box from "@mui/material/Box";
import AuthWrapper from "../AuthWrapper";
import SigninFirebase from "./SigninFirebase";
import AppLogo from "@crema/core/AppLayout/components/AppLogo";

const Signin = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AppLogo />
          </Box>
        </Box>

        <SigninFirebase />
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
