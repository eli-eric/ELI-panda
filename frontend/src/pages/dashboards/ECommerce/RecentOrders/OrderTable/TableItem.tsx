import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RecentOrderData } from "types/models/dashboards/Ecommerce";

interface TableItemProps {
  data: RecentOrderData;
}

const TableItem: React.FC<TableItemProps> = ({ data }) => {
  const getPaymentStatusColor = () => {
    switch (data.status) {
      case "Pending": {
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
      sx={{
        "& .tableCell": {
          fontSize: 13,
          padding: 2,
          "&:first-of-type": {
            pl: 5,
          },
          "&:last-of-type": {
            pr: 5,
          },
        },
      }}
      key={data.id}
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
        {data.product}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.customer}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.date}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.price}
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
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          // onClick={null}
        >
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
