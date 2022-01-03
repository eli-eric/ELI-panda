import React from "react";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface IllustrationDesignProps {}

const IllustrationDesign: React.FC<IllustrationDesignProps> = () => {
  return (
    <AppCard
      sxStyle={{
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
      contentStyle={{ padding: 0 }}
    >
      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "flex",
          "& .widthFull": {
            width: "100%",
          },
        }}
      >
        <img
          className="widthFull"
          src={"/assets/images/illustration.png"}
          alt="illustration"
        />
        <Box
          sx={{
            color: "primary.contrastText",
            position: "absolute",
            left: 0,
            bottom: 0,
            m: { xs: 4, xl: 6 },
          }}
        >
          <Chip
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              fontWeight: Fonts.LIGHT,
              textTransform: "capitalize",
              fontSize: { xs: 16, sm: 18 },
            }}
            label={<IntlMessages id="dashboard.designs" />}
          />
        </Box>
      </Box>

      <Box
        sx={{
          pt: { xs: 4, xl: 6 },
          px: { xs: 4, xl: 6 },
        }}
      >
        <Box
          component="h4"
          sx={{
            mb: 4,
            fontSize: 16,
            fontWeight: Fonts.BOLD,
          }}
        >
          <IntlMessages id="dashboard.illustrationDesign" />
        </Box>
        <Divider
          sx={{
            my: 4,
          }}
        />
        <Box
          sx={{
            color: "text.secondary",
            fontWeight: Fonts.MEDIUM,
            fontSize: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component="span"
            sx={{
              px: 3,
              textAlign: "center",
            }}
          >
            <Box
              component="span"
              sx={{
                mr: 2,
                verticalAlign: "middle",
                display: "inline-block",
              }}
            >
              <VisibilityOutlinedIcon />
            </Box>
            11.7 K
          </Box>
          <Box
            component="span"
            sx={{
              px: 3,
            }}
          >
            <Box
              component="span"
              sx={{
                mr: 2,
                verticalAlign: "middle",
                display: "inline-block",
              }}
            >
              <FavoriteBorderOutlinedIcon />
            </Box>
            2.6 K
          </Box>
          <Box
            component="span"
            sx={{
              px: 3,
            }}
          >
            <Box
              component="span"
              sx={{
                mr: 2,
                verticalAlign: "middle",
                display: "inline-block",
              }}
            >
              <ChatOutlinedIcon />
            </Box>
            345
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default IllustrationDesign;
