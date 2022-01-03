import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
import { Fonts } from "../../../../../shared/constants/AppEnums";

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        borderBottom: "0 none",
        color: grey[500],
        "& .tableCell": {
          fontSize: 13,
          padding: 2,
          fontWeight: Fonts.BOLD,
          backgroundColor: (theme) => theme.palette.background.paper,
          "&:first-of-type": {
            pl: 5,
          },
          "&:last-of-type": {
            pr: 5,
          },
        },
      }}
    >
      <TableCell className="tableCell">Page name</TableCell>
      <TableCell align="right" className="tableCell">
        Page Views
      </TableCell>
      <TableCell align="right" className="tableCell">
        Unique Visitors
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
