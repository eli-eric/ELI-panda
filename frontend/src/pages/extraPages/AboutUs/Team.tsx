import React from "react";
import Slider from "react-slick";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { teamData } from "../../../@crema/services/db/extraPages/aboutUs";
import { Fonts } from "../../../shared/constants/AppEnums";
import { AppCard } from "../../../@crema";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,

  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const Team = () => {
  return (
    <AppCard>
      <Box component="h2" sx={{ mb: 4, fontWeight: Fonts.BOLD, fontSize: 16 }}>
        <IntlMessages id="extra.team" />
      </Box>

      <Box sx={{ mx: -5 }}>
        <Slider {...settings}>
          {teamData.map((member) => {
            return (
              <Box key={member.id} sx={{ px: 5, textAlign: "center" }}>
                <Box width="100%" sx={{ mb: 3 }}>
                  <img
                    style={{ width: "100%" }}
                    src={member.image}
                    alt="about us"
                    title="aboutUs"
                  />
                </Box>
                <Box component="h5" sx={{ mb: 1, fontWeight: Fonts.MEDIUM }}>
                  {member.name}
                </Box>
                <Typography>{member.position}</Typography>
              </Box>
            );
          })}
        </Slider>
      </Box>
    </AppCard>
  );
};

export default Team;
