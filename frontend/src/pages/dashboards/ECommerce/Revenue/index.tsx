import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCircularProgress from "@crema/core/AppCircularProgress";

const Revenue = () => {
  const { messages } = useIntl();

  return (
    <AppCard title={messages["eCommerce.revenue"]}>
      <Box
        sx={{
          mb: 6,
          py: 3,
        }}
      >
        <AppCircularProgress
          activeColor="#0A8FDC"
          value={70}
          hidePercentage
          centerNode={
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: 14,
                    fontWeight: Fonts.MEDIUM,
                  }}
                >
                  $
                </Box>
                <Box
                  component="h3"
                  sx={{
                    color: "text.primary",
                    fontSize: 18,
                    fontWeight: Fonts.MEDIUM,
                  }}
                >
                  600
                </Box>
              </Box>
              <Box
                component="p"
                sx={{
                  ml: 2,
                  fontSize: 14,
                  color: "text.secondary",
                }}
              >
                Sales
              </Box>
            </Box>
          }
          thickness={2}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <Box
            sx={{
              fontSize: 18,
              mb: 0.5,
              fontWeight: Fonts.BOLD,
            }}
          >
            $ 2,000
          </Box>
          <Box
            sx={{
              color: "text.secondary",
            }}
          >
            Target
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              fontSize: 18,
              mb: 0.5,
              fontWeight: Fonts.BOLD,
            }}
          >
            $ 1,500
          </Box>
          <Box
            sx={{
              color: "text.secondary",
            }}
          >
            Current
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Revenue;
