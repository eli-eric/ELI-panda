import React from "react";
import { alpha, Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { useIntl } from "react-intl";
import AppCard from "@crema/core/AppCard";

import { HiOutlineMailOpen } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { WelcomeCardData } from "types/models/dashboards/Analytics";
import AppScrollbar from "../../../../@crema/core/AppScrollbar";

const getWelcomeIcon = (iconType: string) => {
  switch (iconType) {
    case "HiOutlineMailOpen":
      return <HiOutlineMailOpen color="#0A8FDC" className="icon" />;
    case "BiMessageDetail":
      return <BiMessageDetail color="#0A8FDC" className="icon" />;
    default:
      return <CgFileDocument color="#0A8FDC" className="icon" />;
  }
};

interface WelcomeCardProps {
  data: WelcomeCardData[];
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{
        mb: { xs: 5, md: 8 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            mr: { xs: 2, xl: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              mb: { md: 12 },
            }}
          >
            <Box
              component="h5"
              sx={{
                color: "text.secondary",
                fontWeight: Fonts.REGULAR,
                mb: 0.5,
                fontSize: 16,
              }}
            >
              {messages["dashboard.analytics.welcome"]}
            </Box>
            <Box
              component="h3"
              sx={{
                color: "text.primary",
                fontWeight: Fonts.MEDIUM,
                fontSize: 20,
                mb: 3,
              }}
            >
              {messages["dashboard.analytics.eddieMassy"]}
            </Box>
          </Box>
          <Box
            sx={{
              mx: -3,
            }}
          >
            <AppScrollbar
              sx={{
                maxWidth: "100%",
                px: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mx: -3,
                }}
              >
                {data.map((item, index) => (
                  <Box
                    key={"box-" + index}
                    sx={{
                      px: 3,
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mr: 4,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        width: { xs: 46, md: 60 },
                        height: { xs: 46, md: 60 },
                        minWidth: { xs: 46, md: 60 },
                        fontSize: { xs: 24, md: 26 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 1.25,
                        borderRadius: "50%",
                      }}
                    >
                      {getWelcomeIcon(item.icon)}
                    </Box>
                    <Box
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      <Box
                        sx={{
                          color: "text.primary",
                          fontWeight: Fonts.MEDIUM,
                          fontSize: 18,
                          position: "relative",
                          lineHeight: 1,
                          marginBottom: 0.5,
                        }}
                        component="h5"
                      >
                        {item.counts}
                      </Box>

                      <Box component="p">{item.type}</Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </AppScrollbar>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginRight: -2.5,
            marginBottom: -5,
            maxWidth: { sm: 150, xl: 180 },
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "contain",
            },
          }}
        >
          <img alt="welcome" src={"/assets/images/dashboard/welcomImage.svg"} />
        </Box>
      </Box>
    </AppCard>
  );
};

export default WelcomeCard;
