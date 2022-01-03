import React from "react";
import AppCard from "@crema/core/AppCard";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

const ProfileCard = () => {
  return (
    <AppCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{ height: 80, width: 80 }}
          src={"/assets/images/avatar/A10.jpg"}
        />
        <Box
          sx={{
            p: 3,
            mb: 4,
            mt: 2,
          }}
          component="h5"
        >
          Talan Phips
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                py: 5,
                px: 2,
                width: 1 / 2,
                borderRight: (theme) => `solid 1px ${theme.palette.grey[200]}`,
              }}
            >
              <Box component="h5">24</Box>
              <Box
                sx={{
                  color: "text.secondary",
                }}
              >
                Years
              </Box>
            </Box>
            <Box
              sx={{
                py: 5,
                px: 2,
                width: 1 / 2,
              }}
            >
              <Box component="h5">A+</Box>
              <Box
                sx={{
                  color: "text.secondary",
                }}
              >
                Blood
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              borderTop: (theme) => `solid 1px ${theme.palette.grey[200]}`,
            }}
          >
            <Box
              sx={{
                py: 5,
                px: 2,
                width: 1 / 2,
                borderRight: (theme) => `solid 1px ${theme.palette.grey[200]}`,
              }}
            >
              <Box component="h5">185 cm</Box>
              <Box
                sx={{
                  color: "text.secondary",
                }}
              >
                Height
              </Box>
            </Box>
            <Box
              sx={{
                py: 5,
                px: 2,
                width: 1 / 2,
              }}
            >
              <Box component="h5">84 kg</Box>
              <Box
                sx={{
                  color: "text.secondary",
                }}
              >
                Weight
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default ProfileCard;
