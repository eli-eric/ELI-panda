import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHeader from "../../../../@crema/core/AppTable/TableHeader";

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell align="left">Product</TableCell>
      <TableCell align="left">Unit Price</TableCell>
      <TableCell align="left">QTY</TableCell>
      <TableCell align="left">Total</TableCell>
      <TableCell />
    </TableHeader>
  );
};

export default TableHeading;
