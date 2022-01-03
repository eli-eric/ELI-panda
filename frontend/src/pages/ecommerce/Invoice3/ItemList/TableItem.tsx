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
      <TableCell
        component="th"
        scope="row"
        sx={{
          verticalAlign: "top",
        }}
      >
        {product.id}
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
        }}
      >
        <Box
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {product.item}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 0,
            }}
          >
            <Box component="span" sx={{ color: "text.primary" }}>
              Size:
            </Box>
            <Box component="span" sx={{ color: "text.secondary", ml: 2 }}>
              {product.quantity}
            </Box>
          </Box>
          <Box
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 0,
              ml: { xs: 4, xl: 6 },
            }}
          >
            <Box component="span" sx={{ color: "text.primary" }}>
              Color:
            </Box>
            <Box component="span" sx={{ color: "text.secondary", ml: 2 }}>
              {product.desc}
            </Box>
          </Box>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
        }}
      >
        ${product.price}
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
        }}
      >
        {product.quantity}
      </TableCell>
      <TableCell
        sx={{
          verticalAlign: "top",
        }}
      >
        ${product.price}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
