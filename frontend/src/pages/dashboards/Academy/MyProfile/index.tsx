import React from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { useIntl } from "react-intl";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { Profile } from "types/models/dashboards/Academy";

interface MyProfileProps {
  profile: Profile;
}

const MyProfile: React.FC<MyProfileProps> = ({ profile }) => {
  const { profile_pic, name, designation, achievements, friends } = profile;
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
      title={messages["academy.myProfile"]}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 1,
          height: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              width: { xs: 50, md: 770, lg: 90, xl: 110 },
              height: { xs: 50, md: 770, lg: 90, xl: 110 },
              my: 4,
            }}
            src={profile_pic}
          />
          <Box
            component="p"
            sx={{
              mb: 2,
              fontSize: 16,
              fontWeight: Fonts.BOLD,
            }}
          >
            {name}
          </Box>
          <Box
            component="p"
            sx={{
              mb: 2,
              color: "text.secondary",
            }}
          >
            {designation}
          </Box>
        </Box>

        <Box
          sx={{
            width: 1,
            p: { xs: 3, xl: 5 },
            display: "flex",
            alignItems: "center",
            backgroundColor: "#E7F4FC",
            color: "common.black",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 1 / 2,
            }}
          >
            <Box
              sx={{
                mb: 3,
              }}
            >
              <img
                src={"/assets/images/dashboard/academy/achievements.svg"}
                alt="achievements"
              />
            </Box>
            <Box
              sx={{
                my: 1,
                fontSize: 20,
                fontWeight: Fonts.BOLD,
              }}
              component="p"
            >
              {achievements}
            </Box>
            <Box
              component="p"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                textAlign: "center",
              }}
            >
              Achievements
            </Box>
          </Box>
          <Box
            sx={{
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 1 / 2,
              borderLeft: "solid 1px #C8E0EE",
            }}
          >
            <Box
              sx={{
                mt: -1,
                mb: 2,
              }}
            >
              <PersonIcon style={{ fontSize: 40, color: "#FD3A84" }} />
            </Box>
            <Box
              sx={{
                mb: 1.5,
                fontSize: 20,
                fontWeight: Fonts.BOLD,
              }}
              component="p"
            >
              {friends}
            </Box>
            <Box
              component="p"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                textAlign: "center",
              }}
            >
              Friends
            </Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default MyProfile;
