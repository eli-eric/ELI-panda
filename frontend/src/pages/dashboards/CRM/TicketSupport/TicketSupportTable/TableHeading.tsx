import React from "react";
import TableCell from "@mui/material/TableCell";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
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
          borderBottom: "0 none",
          fontSize: 13,
          padding: { xs: 2, xl: 4 },
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
      <TableCell className="tableCell">
        <IntlMessages id="common.num" />
      </TableCell>
      <TableCell align="left" className="tableCell">
        <IntlMessages id="dashboard.basicInfo" />
      </TableCell>
      <TableCell align="left" className="tableCell">
        <IntlMessages id="dashboard.ticketId" />
      </TableCell>
      <TableCell align="left" className="tableCell">
        <IntlMessages id="dashboard.createDate" />
      </TableCell>
      <TableCell align="left" className="tableCell">
        <IntlMessages id="common.contact" />
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
