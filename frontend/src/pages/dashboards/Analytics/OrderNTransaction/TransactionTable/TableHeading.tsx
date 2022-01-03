import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
import { Fonts } from "../../../../../shared/constants/AppEnums";

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        color: grey[500],
        "& .tableCell": {
          fontSize: 13,
          padding: 2,
          fontWeight: Fonts.BOLD,
          "&:first-of-type": {
            pl: 5,
          },
          "&:last-of-type": {
            pr: 5,
          },
        },
      }}
    >
      <TableCell className="tableCell">OrderID</TableCell>
      <TableCell align="left" className="tableCell">
        Customer
      </TableCell>
      <TableCell align="left" className="tableCell">
        Order Date
      </TableCell>
      <TableCell align="left" className="tableCell">
        Payment
      </TableCell>
      <TableCell align="left" className="tableCell">
        Status
      </TableCell>
      <TableCell align="right" className="tableCell" />
    </TableRow>
  );
};

export default TableHeading;
