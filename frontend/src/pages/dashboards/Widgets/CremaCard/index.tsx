import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { SocialInfo } from "types/models/dashboards/Widgets";

interface CremaCardProps {
  data: SocialInfo;
  bgColor: string;
  color: string;
  icon: any;
}

const CremaCard: React.FC<CremaCardProps> = ({
  data,
  color,
  bgColor,
  icon,
}) => {
  return (
    <AppCard
      sxStyle={{
        height: 1,
        backgroundColor: bgColor,
      }}
    >
      <Box
        sx={{
          mb: { xs: 4, xl: 6 },
          mt: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: "flex",
            alignItems: "center",
            width: "calc(100% - 35px)",
          }}
        >
          <Box
            sx={{
              minWidth: 40,
              width: 40,
            }}
          >
            <img alt="logo" src={data.image} />
          </Box>
          <Box
            sx={{
              ml: 3.5,
              fontSize: 14,
              width: "calc(100% - 55px)",
            }}
          >
            <Box
              component="h4"
              sx={{
                color: "primary.contrastText",
                fontWeight: Fonts.BOLD,
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {data.name}
            </Box>
            <Box
              component="span"
              sx={{
                color: "primary.contrastText",
                mb: 0,
                display: "block",
                cursor: "pointer",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {data.id}
            </Box>
          </Box>
        </Box>
        <Box
          component="span"
          sx={{
            ml: "auto",
            fontSize: 20,
          }}
        >
          {icon}
        </Box>
      </Box>

      <Box
        component="p"
        sx={{
          color: "primary.contrastText",
          mb: { xs: 1, xl: 4 },
          fontSize: 14,
        }}
      >
        {data.desc}
      </Box>
    </AppCard>
  );
};

export default CremaCard;
