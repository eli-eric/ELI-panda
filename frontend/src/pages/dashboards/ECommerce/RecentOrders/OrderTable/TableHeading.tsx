import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../../../shared/constants/AppEnums";

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        "& th": {
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
      <TableCell>Order ID</TableCell>
      <TableCell>Product</TableCell>
      <TableCell>Customer</TableCell>
      <TableCell>Delivery Date</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  );
};

export default TableHeading;
