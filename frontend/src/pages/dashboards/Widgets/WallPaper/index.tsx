import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import ImageCardWrapper from "./ImageCardWrapper";

interface WallPaperProps {}

const WallPaper: React.FC<WallPaperProps> = () => {
  return (
    <ImageCardWrapper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 4, lg: 6 },
        }}
      >
        <Box
          component="p"
          sx={{
            fontWeight: Fonts.BOLD,
            fontSize: 16,
            textTransform: "uppercase",
          }}
        >
          <IntlMessages id="dashboard.latestPost" />
        </Box>
        <Box
          sx={{
            ml: "auto",
            mr: -3,
          }}
        >
          <Checkbox
            icon={<FavoriteBorder style={{ color: "white" }} />}
            checkedIcon={<Favorite />}
          />
        </Box>
      </Box>

      <Box
        sx={{
          pt: 10,
        }}
      >
        <Box
          sx={{
            mb: 6,
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
            }}
            src={"/assets/images/avatar/A1.jpg"}
          />
        </Box>

        <Box
          component="h1"
          sx={{
            fontWeight: Fonts.MEDIUM,
            fontSize: { xs: 20, sm: 24, xl: 30 },
            lineHeight: 1.25,
          }}
        >
          <IntlMessages id="dashboard.hdColorful" />
        </Box>
        <Box
          component="h1"
          sx={{
            fontWeight: Fonts.MEDIUM,
            fontSize: { xs: 20, sm: 24, xl: 30 },
            lineHeight: 1.25,
          }}
        >
          <IntlMessages id="dashboard.wallpaperFree" />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Box
            component="h1"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 20, sm: 24, xl: 30 },
              lineHeight: 1.25,
            }}
          >
            <IntlMessages id="common.download" />
          </Box>
          <Box
            sx={{
              ml: "auto",
              mr: -3,
              fontWeight: Fonts.MEDIUM,
              display: "flex",
              textTransform: "uppercase",
              fontSize: { xs: 14, sm: 16, xl: 18 },
            }}
          >
            <Box
              component="span"
              sx={{
                display: "block",
                px: 3,
              }}
            >
              <VisibilityIcon
                sx={{
                  display: { xs: "block", sm: "inline-block" },
                  verticalAlign: { sm: "middle" },
                }}
              />{" "}
              11.7 K
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                px: 3,
              }}
            >
              <FavoriteBorderOutlinedIcon
                sx={{
                  display: { xs: "block", sm: "inline-block" },
                  verticalAlign: { sm: "middle" },
                }}
              />{" "}
              2.6 K
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                px: 3,
              }}
            >
              <ChatIcon
                sx={{
                  display: { xs: "block", sm: "inline-block" },
                  verticalAlign: { sm: "middle" },
                }}
              />{" "}
              345
            </Box>
          </Box>
        </Box>
      </Box>
    </ImageCardWrapper>
  );
};

export default WallPaper;
