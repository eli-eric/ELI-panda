import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import TableContainer from "@mui/material/TableContainer";
import { RecentOrderData } from "types/models/dashboards/Ecommerce";

interface OrderTableProps {
  orderData: RecentOrderData[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orderData }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {orderData.map((data) => (
            <TableItem data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
