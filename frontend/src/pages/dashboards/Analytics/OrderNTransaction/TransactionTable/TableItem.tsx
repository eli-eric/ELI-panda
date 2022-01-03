import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TransactionData } from "types/models/dashboards/Analytics";

interface Props {
  data: TransactionData;
}

const TableItem: React.FC<Props> = ({ data }) => {
  const getPaymentTypeColor = () => {
    switch (data.paymentType) {
      case "COD": {
        return "#F84E4E";
      }
      case "Prepaid": {
        return "#43C888";
      }
      default: {
        return "#E2A72E";
      }
    }
  };
  const getPaymentStatusColor = () => {
    switch (data.status) {
      case "In Transit": {
        return "#F84E4E";
      }
      case "Delivered": {
        return "#43C888";
      }
      default: {
        return "#E2A72E";
      }
    }
  };

  return (
    <TableRow
      key={data.id}
      sx={{
        "& .tableCell": {
          fontSize: 13,
          padding: "12px 8px",
          "&:first-of-type": {
            pl: 5,
          },
          "&:last-of-type": {
            pr: 5,
          },
        },
      }}
      className="item-hover"
    >
      <TableCell component="th" scope="row" className="tableCell">
        <Box
          sx={{
            color: (theme) => theme.palette.primary.main,
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: "inline-block",
          }}
        >
          {data.id}
        </Box>
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.customer}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.date}
      </TableCell>
      <TableCell
        align="left"
        className="tableCell"
        style={{ color: getPaymentTypeColor() }}
      >
        {data.paymentType}
      </TableCell>
      <TableCell align="left" className="tableCell">
        <Box
          sx={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + "44",
            padding: "3px 10px",
            borderRadius: 1,
            display: "inline-block",
          }}
        >
          {data.status}
        </Box>
      </TableCell>
      <TableCell align="right" className="tableCell">
        <MoreHorizIcon />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
