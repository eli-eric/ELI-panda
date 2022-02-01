import { GridOverlay } from "@mui/x-data-grid-pro";
import LinearProgress from "@mui/material/LinearProgress";

const CustomLoadingOverlay = () => {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
};

export default CustomLoadingOverlay;
