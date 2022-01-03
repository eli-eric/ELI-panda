import React from "react";
import AppCard from "@crema/core/AppCard";
import { Box, Typography } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { DrState } from "types/models/dashboards/HealthCare";

interface DrCardProps {
  data: DrState;
}

const DrCard: React.FC<DrCardProps> = ({ data }) => {
  const { bgColor, icon, time, category, name } = data;
  return (
    <AppCard
      sxStyle={{
        backgroundColor: bgColor,
        height: 1,
      }}
      className="card-hover"
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            mr: 3,
            alignSelf: "center",
          }}
        >
          <img src={icon} alt="icon" />
        </Box>
        <Box
          sx={{
            width: "calc(100% - 50px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              color: "white",
              overflow: "hidden",
              mr: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: Fonts.BOLD,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
              component="h5"
              variant="inherit"
              color="inherit"
            >
              {category}
            </Typography>
            <Box
              component="p"
              sx={{
                pt: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {name}
            </Box>
          </Box>
          <Box
            sx={{
              height: 50,
              width: 50,
              ml: "auto",
              display: "flex",
              alignItems: "center",
              borderRadius: "50%",
              justifyContent: "center",
              fontWeight: Fonts.BOLD,
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: (theme) => theme.palette.background.paper,
              "@media screen and (max-width: 1600px) and (min-width: 1200px)": {
                display: "none",
              },
            }}
          >
            {time}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default DrCard;
