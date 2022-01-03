import React from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";

interface RatingCellProps {
  selected: number[];
  data: any;
  onChange: (val: any) => void;
}

const RatingCell: React.FC<RatingCellProps> = ({
  selected,
  data,
  onChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => onChange(data)}
      className="pointer"
    >
      <Checkbox
        checked={selected.some((item) => item === data)}
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      {data}
      <StarIcon
        style={{ fontSize: 16, marginRight: 5, marginLeft: 2, marginTop: 3 }}
      />
      & above
    </Box>
  );
};

export default RatingCell;
