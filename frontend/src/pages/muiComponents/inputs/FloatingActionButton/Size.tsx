import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function FloatingActionButtonSize() {
  return (
    <Box>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab size="small" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab size="medium" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab variant="extended" size="small" color="primary" aria-label="add">
          <NavigationIcon sx={{ mr: 1 }} />
          Extended
        </Fab>
        <Fab variant="extended" size="medium" color="primary" aria-label="add">
          <NavigationIcon sx={{ mr: 1 }} />
          Extended
        </Fab>
        <Fab variant="extended" color="primary" aria-label="add">
          <NavigationIcon sx={{ mr: 1 }} />
          Extended
        </Fab>
      </Box>
    </Box>
  );
}
