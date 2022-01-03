import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeCartItem, updateCartItem } from "../../../../redux/actions";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { styled } from "@mui/material/styles";
import { CartItems } from "../../../../types/models/ecommerce/EcommerceApp";

interface CartTableProps {
  data: CartItems;
}

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  "&:first-of-type": {
    paddingLeft: 20,
  },
  "&:last-of-type": {
    paddingRight: 20,
  },
}));

const TableItem: React.FC<CartTableProps> = ({ data }) => {
  const dispatch = useDispatch();

  const onRemoveItem = (data: CartItems) => {
    dispatch(removeCartItem(data));
  };

  const onDecrement = () => {
    if (data.count > 0) {
      dispatch(updateCartItem({ ...data, count: data.count - 1 }));
    } else {
      dispatch(removeCartItem(data));
    }
  };
  const onIncrement = () => {
    dispatch(updateCartItem({ ...data, count: data.count + 1 }));
  };

  return (
    <TableRow key={data.id} className="item-hover">
      <StyledTableCell>
        <Box display="flex">
          <Avatar sx={{ mr: 3.5 }} src={data.image} />
          <Box>
            <Box fontSize={14} fontWeight={Fonts.MEDIUM}>
              {data.title}
            </Box>
            <Box color="text.secondary" fontSize={14}>
              Brand: {data.brand}
            </Box>
          </Box>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left" style={{ fontWeight: Fonts.MEDIUM }}>
        ${+data.mrp - +data.discount}
      </StyledTableCell>
      <StyledTableCell align="left">
        <Box
          border={1}
          borderRadius={4}
          display="flex"
          borderColor="text.secondary"
          alignItems="center"
          justifyContent="center"
          width={100}
          height={36}
        >
          <AddIcon className="pointer" onClick={onIncrement} />
          <Box component="span" px={3}>
            {data.count}
          </Box>
          <RemoveIcon className="pointer" onClick={onDecrement} />
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left" style={{ fontWeight: Fonts.MEDIUM }}>
        ${(+data.mrp - +data.discount) * +data.count}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        <CancelIcon onClick={() => onRemoveItem(data)} />
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;
