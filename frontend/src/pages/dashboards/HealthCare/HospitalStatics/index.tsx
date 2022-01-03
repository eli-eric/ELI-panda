import React from "react";
import AppCard from "@crema/core/AppCard";
import { Box, Typography } from "@mui/material";
import { Doses } from "types/models/dashboards/HealthCare";

interface HospitalStaticsProps {
  data: Doses;
}

const HospitalStatics: React.FC<HospitalStaticsProps> = ({ data }) => {
  const { bgColor, icon, value, name } = data;
  return (
    <AppCard
      sxStyle={{
        height: 1,
        backgroundColor: bgColor,
      }}
      className="card-hover"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 4,
            alignSelf: "flex-start",
          }}
        >
          <img src={icon} alt="icon" />
        </Box>
        <Box
          sx={{
            width: "calc(100% - 70px)",
          }}
        >
          <Typography
            component="h5"
            variant="inherit"
            color="inherit"
            sx={{
              fontSize: 16,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {value}
          </Typography>
          <Box
            component="p"
            sx={{
              pt: 0.5,
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {name}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default HospitalStatics;
