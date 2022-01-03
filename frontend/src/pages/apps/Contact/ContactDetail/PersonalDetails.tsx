import React from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/utility/IntlMessages";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { Fonts } from "shared/constants/AppEnums";
import { ContactObj } from "types/models/apps/Contact";

interface PersonalDetailsProps {
  contact: ContactObj;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ contact }) => {
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
        <IntlMessages id="contactApp.personalDetails" />
      </Box>

      <div>
        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <EmailOutlinedIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {contact.email}
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <PhoneOutlinedIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {contact.contact}
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <LanguageIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {contact.website ? (
              contact.website
            ) : (
              <IntlMessages id="common.na" />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CakeOutlinedIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {contact.birthday ? (
              contact.birthday
            ) : (
              <IntlMessages id="common.na" />
            )}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default PersonalDetails;
