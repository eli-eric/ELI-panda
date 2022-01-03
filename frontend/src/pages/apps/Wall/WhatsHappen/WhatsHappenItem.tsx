import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "shared/constants/AppEnums";
import { Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { WhatsHappenData } from "types/models/apps/Wall";

const ThumbWrapper = styled("div")(() => ({
  borderRadius: 4,
  overflow: "hidden",
  width: 56,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
}));

const StyledBox = styled(Box)(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: Fonts.MEDIUM,
  fontSize: 12,
  mb: 0.5,
}));

interface whatsHappenItemProps {
  data: WhatsHappenData;
}

const WhatsHappenItem: React.FC<whatsHappenItemProps> = ({ data }) => {
  const { imgSrc, subTitle, title } = data;
  return (
    <Box
      className="item-hover"
      sx={{
        position: "relative",
        display: "flex",
        px: 5,
        py: 2,
      }}
    >
      <ThumbWrapper>
        <img src={imgSrc} alt="happen img" />
      </ThumbWrapper>
      <Box
        sx={{
          paddingLeft: 3.5,
          width: "calc(100% - 98px)",
        }}
      >
        <StyledBox component="p" color="text.secondary">
          {subTitle}
        </StyledBox>
        <Typography
          component="h5"
          variant="h5"
          sx={{
            fontWeight: Fonts.SEMI_BOLD,
            marginBottom: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
        <StyledBox color="primary.main" component="p">
          {data.tag.map((val) => (
            <Box component="span" mr={1} key={val.id}>
              #{val.name}
            </Box>
          ))}
        </StyledBox>
      </Box>
      <Box
        sx={{
          marginLeft: 2,
          width: 34,
        }}
      >
        <IconButton
          sx={{
            padding: 1.25,
            marginTop: -2.5,
            marginRight: -3,
          }}
          size="large"
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default WhatsHappenItem;
