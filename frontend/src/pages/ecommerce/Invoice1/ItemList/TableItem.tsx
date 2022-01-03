import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";

interface TableItemProps {
  product: {
    id: number;
    item: string;
    desc: string;
    type: string;
    quantity: string;
    price: number;
  };
}

const TableItem: React.FC<TableItemProps> = ({ product }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Box
          sx={{
            mb: 2,

            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.item}
        </Box>
        <Box component="p" sx={{ color: "text.secondary", mb: 0 }}>
          {product.desc}
        </Box>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: "right",
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.type}
        </Box>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: "right",
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.quantity}
        </Box>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
        }}
      >
        <Box
          sx={{
            mb: 2,

            textAlign: "right",
            fontSize: 13,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          ${product.price}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
