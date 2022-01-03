import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import AppCircularProgress from "@crema/core/AppCircularProgress";

const Application = () => {
  const { messages } = useIntl();
  return (
    <AppCard title={messages["eCommerce.application"]} sxStyle={{ height: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mb: 9,
          }}
        >
          <AppCircularProgress
            activeColor="#49BD65"
            hidePercentage
            value={70}
            centerNode={
              <img
                alt="icon"
                src={"/assets/images/dashboard/application_icon.svg"}
              />
            }
            thickness={2}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              mr: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#49BD65",
                height: 10,
                width: 10,
                mr: 2,
                borderRadius: "50%",
              }}
            />
            <Typography>Android</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#d6d6d6",
                height: 10,
                width: 10,
                mr: 2,
                borderRadius: "50%",
              }}
            />
            <Typography>IOS</Typography>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Application;
