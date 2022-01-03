import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHeader from "@crema/core/AppTable/TableHeader";

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell>Order ID</TableCell>
      <TableCell align="left">Product</TableCell>
      <TableCell align="left">Customer</TableCell>
      <TableCell align="left">Delivery Date</TableCell>
      <TableCell align="left">Price</TableCell>
      <TableCell align="left">Payment Method</TableCell>
      <TableCell align="left">Status</TableCell>
      <TableCell align="right">Actions</TableCell>
    </TableHeader>
  );
};

export default TableHeading;
