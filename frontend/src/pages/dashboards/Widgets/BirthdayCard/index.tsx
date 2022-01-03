import React from "react";
import { Box } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import { blue } from "@mui/material/colors";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";

interface BirthdayCardProps {}

const BirthdayCard: React.FC<BirthdayCardProps> = () => {
  return (
    <AppCard
      sxStyle={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        p: 0,
      }}
      contentStyle={{ padding: 0 }}
    >
      <Box
        sx={{
          p: { xs: 5, xl: 8 },
          color: "primary.contrastText",
          textAlign: "center",
          backgroundColor: blue[700],
        }}
      >
        <Box
          component="h3"
          sx={{
            fontWeight: Fonts.BOLD,
            fontSize: 16,
          }}
        >
          Sunday, 07 July 1991
        </Box>
      </Box>
      <Box
        sx={{
          px: { xs: 6, sm: 8, xl: 10 },
          py: { xs: 5, sm: 7, xl: 8 },
        }}
      >
        <Box
          sx={{
            pb: 4,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={"/assets/images/cakeicon.png"} alt="cake" />
        </Box>
        <Box
          sx={{
            mb: { xl: 5 },
            textAlign: "center",
          }}
        >
          <Box
            component="p"
            sx={{
              fontSize: 14,
            }}
          >
            <IntlMessages id="dashboard.antonBirthday" />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default BirthdayCard;
