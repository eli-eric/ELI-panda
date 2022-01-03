import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import AppTableContainer from "../../../../../@crema/core/AppTableContainer";
import { DealsTableData } from "types/models/dashboards/CRM";

interface DealsTableProps {
  dealsTableData: DealsTableData[];
}

const DealsTable: React.FC<DealsTableProps> = ({ dealsTableData }) => {
  return (
    <AppTableContainer>
      <Table className="table">
        <TableHead
          sx={{
            borderBottom: "0 none",
          }}
        >
          <TableHeading />
        </TableHead>
        <TableBody
          sx={{
            borderBottom: "0 none",
          }}
        >
          {dealsTableData.map((row) => (
            <TableItem row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default DealsTable;
