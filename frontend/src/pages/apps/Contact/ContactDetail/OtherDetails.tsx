import React from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import BusinessIcon from "@mui/icons-material/Business";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Fonts } from "shared/constants/AppEnums";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { ContactObj } from "../../../../types/models/apps/Contact";

interface OtherDetailsProps {
  contact: ContactObj;
}

const OtherDetails: React.FC<OtherDetailsProps> = ({ contact }) => {
  return (
    <Box
      sx={{
        pb: 5,
      }}
    >
      <Box
        component="h4"
        sx={{
          mb: 4,
          fontWeight: Fonts.SEMI_BOLD,
        }}
      >
        <IntlMessages id="common.otherDetails" />
      </Box>

      <div>
        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <BusinessIcon
            sx={{
              fontSize: 24,
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {contact.company ? (
              contact.company
            ) : (
              <IntlMessages id="common.na" />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <HomeOutlinedIcon
            sx={{
              fontSize: 24,
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {contact.address ? (
              contact.address
            ) : (
              <IntlMessages id="common.na" />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            color: "text.secondary",
          }}
        >
          <FiFacebook />
          <Box
            sx={{
              ml: 3.5,
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
            fontSize: 24,
            color: "text.secondary",
          }}
        >
          <FiTwitter />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {contact.twitterId ? (
              contact.twitterId
            ) : (
              <IntlMessages id="common.na" />
            )}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default OtherDetails;
