import React from "react";
import TableCell from "@mui/material/TableCell";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import TableHeader from "../../../../@crema/core/AppTable/TableHeader";

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell>
        <IntlMessages id="invoice.project" />
      </TableCell>
      <TableCell>
        <IntlMessages id="invoice.itemDesc" />
      </TableCell>
      <TableCell>
        <IntlMessages id="invoice.pricePerUnit" />
      </TableCell>
      <TableCell>
        <IntlMessages id="invoice.quantity" />
      </TableCell>
      <TableCell>
        <IntlMessages id="invoice.subTotal" />
      </TableCell>
    </TableHeader>
  );
};

export default TableHeading;
