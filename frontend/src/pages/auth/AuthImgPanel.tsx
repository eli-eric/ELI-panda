import React from "react";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import AppLogo from "../../@crema/core/AppLayout/components/AppLogo";

const LogoWrapper = styled("div")(({ theme }) => {
  return {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
    zIndex: 1,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("xl")]: {
      top: 60,
    },
  };
});

const AuthImgPanel = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src="/assets/images/auth/auth.svg"
        alt="crema-logo"
      />
      <LogoWrapper>
        <AppLogo />
      </LogoWrapper>
    </Box>
  );
};

export default AuthImgPanel;
