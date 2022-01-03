import React from "react";
import { Box } from "@mui/material";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import StarRateIcon from "@mui/icons-material/StarRate";
import Avatar from "@mui/material/Avatar";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import IconButton from "@mui/material/IconButton";

const ReviewCell = () => {
  return (
    <Box
      className="item-hover"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        px: 4,
        py: 3,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Avatar
          sx={{
            height: 50,
            width: 50,
            overflow: "hidden",
          }}
          alt="user image"
          src={"/assets/images/avatar/A1.jpg"}
        />

        <Box
          sx={{
            flex: 1,
            ml: 4,
          }}
        >
          <Box
            component="h3"
            sx={{
              color: "text.primary",
              display: "flex",
              mb: 2,
              fontWeight: Fonts.BOLD,
              alignItems: "center",
              fontSize: 14,
            }}
          >
            <Box
              component="span"
              sx={{
                color: "white",
                backgroundColor: "#388E3C",
                width: 34,
                mr: 2,
                pt: 0.25,
                pb: 0.5,
                px: 2,
                display: "flex",
                alignItems: "center",
                borderRadius: 10,
                fontSize: 12,
              }}
            >
              <Box component="span" sx={{ pb: 0.5 }}>
                5
              </Box>
              <StarRateIcon style={{ fontSize: 16 }} />
            </Box>
            Parmar Ravikumar
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            If several languages coalesce, the grammar of the resulting language
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 12,
              color: "text.hint",
            }}
          >
            5 hrs ago
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          bottom: 2,
          right: 2,
          flexDirection: "row",
          color: "#737989",
          alignItems: "center",
          fontSize: 14,
        }}
      >
        <IconButton style={{ marginRight: 5, height: 25, width: 25 }}>
          <ThumbUpAltOutlinedIcon style={{ fontSize: 16 }} />
        </IconButton>
        345
        <IconButton
          style={{ marginRight: 5, marginLeft: 15, height: 25, width: 25 }}
        >
          <ThumbDownAltOutlinedIcon style={{ fontSize: 16 }} />
        </IconButton>
        13
      </Box>
    </Box>
  );
};
export default ReviewCell;
