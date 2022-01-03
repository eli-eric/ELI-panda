import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoopIcon from "@mui/icons-material/Loop";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const DeliveryInfo = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box
          component="h3"
          sx={{
            color: "text.primary",
            fontSize: 16,
            mb: 3,
          }}
        >
          Deliver to
        </Box>
        <TextField
          id="delivery-pin-code"
          label="Pin Code"
          variant="outlined"
          size="small"
        />

        <Box
          sx={{
            fontSize: 14,
            mt: 2,
          }}
        >
          Delivery in 5-7 days |{" "}
          <Box
            component="span"
            sx={{
              color: "#49BD65",
              mx: 3,
            }}
          >
            Free
          </Box>
          <Box
            component="span"
            sx={{
              color: "text.secondary",
            }}
          >
            $40
          </Box>
        </Box>
        <Box
          sx={{
            mt: 1,
          }}
        >
          If ordered before 2:05 AM
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box
          component="h3"
          sx={{
            color: "text.primary",
            fontSize: 16,
            mb: 3,
          }}
        >
          Services
        </Box>

        <Box
          sx={{
            fontSize: 14,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title="Return policy">
            <LoopIcon sx={{ color: "primary.main", fontSize: 18 }} />
          </Tooltip>
          <Box
            sx={{
              color: "text.primary",
              ml: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            30 Day Return Policy
            <Tooltip title="info">
              <InfoIcon
                sx={{ color: "#A0A5B9", fontSize: 18, marginLeft: 12 }}
              />
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            fontSize: 14,
            my: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title="COD Available">
            <MonetizationOnIcon sx={{ color: "primary.main", fontSize: 18 }} />
          </Tooltip>
          <Box
            sx={{
              color: "text.primary",
              ml: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            Cash on Delivery available{" "}
            <Tooltip title="info">
              <InfoIcon
                sx={{ color: "#A0A5B9", fontSize: 18, marginLeft: 12 }}
              />
            </Tooltip>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DeliveryInfo;
