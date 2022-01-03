import React from "react";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import invoiceData from "../../../../@crema/services/db/extraPages/invoice/invoiceData";
import Table from "@mui/material/Table";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";

const StyledTable = styled(Table)(({ theme }) => ({
  "& > thead > tr > th, & > tbody > tr > th, & > tfoot > tr > th, & > thead > tr > td, & > tbody > tr > td, & > tfoot > tr > td":
    {
      padding: "12px 16px",
      fontSize: 14,
      "&:first-child": {
        paddingLeft: 24,
        [theme.breakpoints.up("xl")]: {
          paddingLeft: 32,
        },
      },
      "&:lst-child": {
        paddingRight: 24,
        [theme.breakpoints.up("xl")]: {
          paddingRight: 32,
        },
      },
    },
}));

const ItemList = () => {
  return (
    <StyledTable>
      <TableHead>
        <TableHeading />
      </TableHead>

      <TableBody>
        {invoiceData.products.map((product) => {
          return <TableItem key={product.id} product={product} />;
        })}
      </TableBody>
    </StyledTable>
  );
};

export default ItemList;
