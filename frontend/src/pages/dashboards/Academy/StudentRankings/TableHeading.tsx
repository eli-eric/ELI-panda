import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../../shared/constants/AppEnums";

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        position: "relative",
        "& .tableCell": {
          fontSize: 13,
          padding: 2,
          paddingTop: 0,
          fontWeight: Fonts.BOLD,
          whiteSpace: "nowrap",
          "&:first-of-type": {
            paddingLeft: 5,
          },
          "&:last-of-type": {
            paddingRight: 5,
          },
        },
      }}
    >
      <TableCell align="left" className="tableCell">
        Student Name
      </TableCell>
      <TableCell align="left" className="tableCell">
        Course ID
      </TableCell>
      <TableCell align="left" className="tableCell">
        Course Name
      </TableCell>
      <TableCell align="left" className="tableCell">
        Total Grade
      </TableCell>
      <TableCell align="left" className="tableCell">
        Ranking
      </TableCell>
      <TableCell align="left" className="tableCell">
        Category
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
