import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import TableContainer from "@mui/material/TableContainer";
import { MarketingCampaignData } from "types/models/dashboards/Ecommerce";

interface OrderTableProps {
  marketingCampaign: MarketingCampaignData[];
}

const OrderTable: React.FC<OrderTableProps> = ({ marketingCampaign }) => {
  return (
    <TableContainer
      sx={{
        maxHeight: 500,
      }}
    >
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {marketingCampaign.map((data) => (
            <TableItem data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
