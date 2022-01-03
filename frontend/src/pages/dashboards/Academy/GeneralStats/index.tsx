import React from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";

import Avatar from "@mui/material/Avatar";
import { Fonts } from "../../../../shared/constants/AppEnums";

import { BiBasket } from "react-icons/bi";
import { FcGraduationCap, FcReading } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";
import { AcademicStats } from "types/models/dashboards/Academy";

const getIcon: React.FC<any> = (iconType) => {
  switch (iconType) {
    case "BiBasket":
      return <BiBasket color="#9E49E6" className="icon" />;
    case "FcGraduationCap":
      return <FcGraduationCap color="#0A8FDC" className="icon" />;
    case "GiBookshelf":
      return <GiBookshelf color="#49BD65" className="icon" />;
    default:
      return <FcReading color="#9E49E6" className="icon" />;
  }
};

interface GeneralStatsProps {
  stats: AcademicStats;
}

const GeneralStats: React.FC<GeneralStatsProps> = ({ stats }) => {
  return (
    <AppCard sxStyle={{ height: 1 }} className="card-hover">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 4,
          }}
        >
          <Avatar
            sx={{
              width: { xs: 46, lg: 54, xl: 60 },
              height: { xs: 46, lg: 54, xl: 60 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: stats.bgcolor,
              padding: 2.5,
            }}
          >
            {getIcon(stats.icon)}
          </Avatar>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: {
              xs: "calc(100% - 62px)",
              lg: "calc(100% - 70px)",
              xl: "calc(100% - 76px)",
            },
          }}
        >
          <Box sx={{ overflow: "hidden" }}>
            <Box component="h3">{stats.count}</Box>
            <Box
              component="p"
              sx={{
                color: "text.secondary",
                fontSize: 14,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {stats.title}
            </Box>
          </Box>
          <Box
            component="span"
            sx={{
              backgroundColor: stats.bgcolor,
              borderRadius: 30,
              color: stats.badgeColor,
              padding: "4px 12px",
              fontSize: 12,
              fontWeight: Fonts.MEDIUM,
              display: "inline-block",
              minWidth: 75,
              textAlign: "center",
              "@media only screen and (max-width: 1580px) and (min-width: 1200px)":
                {
                  display: "none",
                },
            }}
          >
            {stats.new}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default GeneralStats;
