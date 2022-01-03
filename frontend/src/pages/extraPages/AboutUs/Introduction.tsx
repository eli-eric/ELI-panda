import React from "react";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../shared/constants/AppEnums";

const Introduction = () => {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "@media (min-width: 768px)": {
            flexDirection: "row",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxHeight: 300,
            "@media (min-width: 768px)": {
              width: "40%",
              order: 2,
            },
            "& > img": {
              objectFit: "cover",
              width: "100%",
              height: "100%",
            },
          }}
        >
          <img
            src={"/assets/images/AboutUs.png"}
            alt="about us"
            title="aboutUs"
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: 5,
            "@media (min-width: 768px)": {
              width: "60%",
              order: 1,
            },
          }}
        >
          <Box
            component="h2"
            sx={{
              mb: 4,
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
          >
            <IntlMessages id="extra.aboutUs" />
          </Box>
          <Box component="p" sx={{ mb: 5 }}>
            <IntlMessages id="extra.aboutContent" />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: Fonts.LIGHT,
                fontSize: 14,
                marginRight: { xs: 4, xl: 6 },
                marginBottom: 2,
              }}
            >
              <IntlMessages id="extra.contactUs" />
            </Button>
            <Button
              variant="contained"
              sx={{
                fontWeight: Fonts.MEDIUM,
                fontSize: 14,
                marginBottom: 2,
                backgroundColor: "white",
                color: "black",
              }}
            >
              <IntlMessages id="dashboard.readMore" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Introduction;
