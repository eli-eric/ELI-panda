import React from "react";
import SocialMediaGraph from "./SocialMediaGraph";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import { useIntl } from "react-intl";
import { SocialMediaData } from "types/models/dashboards/CRM";

interface SocialMediaAdvertiseProps {
  socialMediaData: SocialMediaData[];
}

const SocialMediaAdvertise: React.FC<SocialMediaAdvertiseProps> = ({
  socialMediaData,
}) => {
  const { messages } = useIntl();
  return (
    <AppCard title={messages["dashboard.socialMedia"]} sxStyle={{ height: 1 }}>
      <SocialMediaGraph socialMediaData={socialMediaData} />
      <Box
        sx={{
          mb: 1,
          mx: { xs: -2, xl: -3 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {socialMediaData.map((item) => {
          return (
            <Box
              sx={{
                px: { xs: 2, xl: 3 },
              }}
              key={item.id}
            >
              <Box
                component="h4"
                sx={{
                  mb: 1,
                  fontWeight: Fonts.MEDIUM,
                  fontSize: 18,
                  color: item.color,
                }}
              >
                {item.revenue}
              </Box>
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  component="p"
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    textTransform: "capitalize",
                  }}
                >
                  {item.name}
                </Box>
                <Box
                  component="span"
                  sx={{ color: item.changeColor, fontSize: 13 }}
                >
                  {item.change}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </AppCard>
  );
};

export default SocialMediaAdvertise;
