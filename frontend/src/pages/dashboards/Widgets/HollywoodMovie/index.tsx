import React from "react";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";

interface HollywoodMovieProps {}

const HollywoodMovie: React.FC<HollywoodMovieProps> = () => {
  return (
    <AppCard
      sxStyle={{
        height: 1,
        backgroundImage: `url(/assets/images/widgets/movie.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        color: "white",
        position: "relative",
        minHeight: 300,
        "&:before": {
          content: '""',
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.35)",
        },
        "& > *": {
          position: "relative",
          zIndex: 3,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="span"
            sx={{
              width: { xs: 50, sm: 70, md: 90, xl: 110 },
              height: { xs: 50, sm: 70, md: 90, xl: 110 },
              cursor: "pointer",
            }}
          >
            <img src={"/assets/images/playbutton.png"} alt="play" />
          </Box>
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Box
            component="h1"
            sx={{
              color: "primary.contrastText",
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 20, sm: 24, xl: 30 },
            }}
          >
            <IntlMessages id="dashboard.hollywoodMovie" />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default HollywoodMovie;
