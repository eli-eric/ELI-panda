import React from "react";
import Avatar from "@mui/material/Avatar";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import { ProfileData } from "types/models/dashboards/Widgets";

interface ProfileProps {
  data: ProfileData;
}

const Profile: React.FC<ProfileProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      contentStyle={{
        display: "flex",
        flexDirection: "column",
      }}
      title={messages["common.wall"]}
      action={
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
        />
      }
    >
      <Box
        sx={{
          mb: 8,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 },
          }}
          src={data.image}
        />
        <Box
          component="h3"
          sx={{
            mt: 8,
            fontWeight: Fonts.BOLD,
            fontSize: 16,
          }}
        >
          {data.name}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          mb: 1,
        }}
      >
        <Box
          sx={{
            px: { xs: 2, xl: 4 },
          }}
        >
          <Box
            component="span"
            sx={{
              display: "block",
              mb: 2,
              fontWeight: Fonts.MEDIUM,
              fontSize: 20,
            }}
          >
            {data.photos}
          </Box>
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              display: "block",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            <IntlMessages id="dashboard.photos" />
          </Box>
        </Box>
        <Box
          sx={{
            px: { xs: 2, xl: 4 },
          }}
        >
          <Box
            component="span"
            sx={{
              display: "block",
              mb: 2,
              fontWeight: Fonts.MEDIUM,
              fontSize: 20,
            }}
          >
            {data.followers}
          </Box>
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              display: "block",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            <IntlMessages id="dashboard.followers" />
          </Box>
        </Box>
        <Box
          sx={{
            px: { xs: 2, xl: 4 },
          }}
        >
          <Box
            component="span"
            sx={{
              display: "block",
              mb: 2,
              fontWeight: Fonts.MEDIUM,
              fontSize: 20,
            }}
          >
            {data.following}
          </Box>
          <Box
            component="span"
            sx={{
              color: "text.secondary",
              display: "block",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            <IntlMessages id="dashboard.following" />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Profile;
