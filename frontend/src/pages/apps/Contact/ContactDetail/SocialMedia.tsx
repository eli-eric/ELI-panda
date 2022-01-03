import React from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { Fonts } from "shared/constants/AppEnums";

import { ContactObj } from "types/models/apps/Contact";

interface SocialMediaProps {
  contact: ContactObj;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ contact }) => {
  return (
    <Box
      sx={{
        pr: { xs: 5, lg: 8, xl: 10 },
        py: 5,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        component="h6"
        sx={{
          mb: 2,
          fontWeight: Fonts.MEDIUM,
          fontSize: 16,
        }}
      >
        <IntlMessages id="common.socialMedia" />
      </Box>

      <Box
        sx={{
          px: { xs: 5, lg: 8, xl: 10 },
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <FiFacebook />
          <Box
            sx={{
              ml: 2,
              color: "text.secondary",
            }}
          >
            {contact.facebookId ? (
              contact.facebookId
            ) : (
              <IntlMessages id="common.na" />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <FiTwitter />
          <Box
            sx={{
              ml: 2,
              color: "text.secondary",
            }}
          >
            {contact.twitterId ? (
              contact.twitterId
            ) : (
              <IntlMessages id="common.na" />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMedia;
