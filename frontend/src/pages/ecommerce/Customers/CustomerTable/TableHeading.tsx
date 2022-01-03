import React from "react";
import { TableCell } from "@mui/material";
import TableHeader from "@crema/core/AppTable/TableHeader";

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell align="left">Name</TableCell>
      <TableCell align="left">Email</TableCell>
      <TableCell align="left">Last Item</TableCell>
      <TableCell align="left">Last Order</TableCell>
      <TableCell align="left">Rating</TableCell>
      <TableCell align="left">Wallet Balance</TableCell>
      <TableCell align="right">Address</TableCell>
      <TableCell align="right">Join Date</TableCell>
      <TableCell align="right">Action</TableCell>
    </TableHeader>
  );
};

export default TableHeading;
