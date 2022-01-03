import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import AppTableContainer from "../../../../@crema/core/AppTableContainer";
import { CustomersData } from "../../../../types/models/ecommerce/EcommerceApp";

interface CustomerTableProps {
  customers: CustomersData[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
    <AppTableContainer>
      <Table stickyHeader className="table">
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {customers.map((data) => (
            <TableItem data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CustomerTable;
