import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { SlideBasicFour } from "../../../../@crema/services/db/thirdParty/reactSlick";

interface SlideItemProps {
  slide: SlideBasicFour;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxHeight: { xs: 220, md: 280, lg: 360, xl: 340 },
          minHeight: { xs: 210, md: 270, lg: 350, xl: 330 },
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            "& img": {
              maxWidth: "100%",
              maxHeight: "100%",
              height: "100%",
              width: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: 2.5,
            },
          }}
        >
          <img src={slide.srcImg} alt="Art" />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          pt: { xs: 4, md: 10 },
          pb: { xs: 4, md: 6 },
          px: { md: 8 },
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontSize: 16,
            fontWeight: Fonts.SEMI_BOLD,
            mb: 5,
          }}
        >
          {slide.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Box
            sx={{
              mr: 3.5,
            }}
          >
            <Avatar src={slide.avatar} alt={slide.avatarName} />
          </Box>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Typography
              component="h5"
              sx={{
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              {slide.avatarName}
            </Typography>
            <Box
              sx={{
                color: "text.secondary",
              }}
            >
              {slide.data}
            </Box>
          </Box>
        </Box>
        <Typography>{slide.description}</Typography>
      </Box>
    </Box>
  );
};

export default SlideItem;
