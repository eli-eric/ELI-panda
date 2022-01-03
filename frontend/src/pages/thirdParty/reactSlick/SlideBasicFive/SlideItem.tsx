import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { SlideBasic } from "../../../../@crema/services/db/thirdParty/reactSlick";

interface SlideItemProps {
  slide: SlideBasic;
}

const SlideItem: React.FC<SlideItemProps> = ({ slide }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "relative",
          pb: 8,
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxHeight: 160,
            minHeight: 150,
            "& img": {
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              width: "100%",
              height: "100%",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <img src={slide.srcImg} alt={slide.title} />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 16,
            width: 64,
            height: 64,
            border: (theme) => `solid 2px ${theme.palette.common.white}`,
            borderRadius: 2,
            "& img": {
              width: "100%",
              height: "100%",
              borderRadius: 2,
            },
          }}
        >
          <img src={slide.srcImg} alt={slide.title} />
        </Box>
      </Box>
      <Box
        sx={{
          py: 3,
          px: 4,
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontSize: 16,
            fontWeight: Fonts.SEMI_BOLD,
            mb: 3,
          }}
        >
          {slide.title}
        </Typography>
        <Typography>{slide.description}</Typography>
      </Box>
    </Box>
  );
};

export default SlideItem;
