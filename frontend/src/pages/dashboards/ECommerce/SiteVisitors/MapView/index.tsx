import React, { useState } from "react";
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import { Box } from "@mui/material";

const MapView = () => {
  const [content, setContent] = useState("");
  return (
    <Box
      sx={{
        position: "relative",
        height: 200,
      }}
    >
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </Box>
  );
};

export default MapView;
