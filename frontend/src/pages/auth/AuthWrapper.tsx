import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Fonts } from "../../shared/constants/AppEnums";

interface AuthWrapperProps {
  children: any;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          minHeight: { xs: 320, sm: 450 },
          width: "100%",
          overflow: "hidden",
          position: "relative",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "50%", lg: "40%" },
            padding: { xs: 5, lg: 10 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "50%", lg: "60%" },
            position: "relative",
            padding: { xs: 5, lg: 10 },
            display: { xs: "none", sm: "flex" },
            alignItems: { sm: "center" },
            justifyContent: { sm: "center" },
            flexDirection: { sm: "column" },
            backgroundColor: (theme) => theme.palette.grey[900],
            color: (theme) => theme.palette.common.white,
            fontSize: 14,
          }}
        >
          <Box
            sx={{
              maxWidth: 320,
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 30,
                mb: 4,
              }}
            >
              Welcome to Crema!
            </Typography>
            <Typography>
              Crema is purely based on Material ui components and follows
              Material ui guidelines.
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AuthWrapper;
