import React from "react";
import { alpha, Box, Hidden, Stack } from "@mui/material";
import AppSearch from "../../../../@crema/core/AppSearchBar";
import ListIcon from "@mui/icons-material/List";
import AppsIcon from "@mui/icons-material/Apps";
import { useDispatch } from "react-redux";
import { VIEW_TYPE } from "../../../../redux/reducers/Ecommerce";
import IconButton from "@mui/material/IconButton";
import { setViewType } from "../../../../redux/actions";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import AppsPagination from "../../../../@crema/core/AppsPagination";
import { ProductData } from "../../../../types/models/ecommerce/EcommerceApp";

const IconBtn = styled(IconButton)(({ theme }) => {
  return {
    color: theme.palette.text.disabled,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    padding: 8,
    "&:hover, &:focus": {
      color: theme.palette.primary.main,
    },
    "&.active": {
      color: theme.palette.primary.main,
    },
  };
});

interface ProductHeaderProps {
  onSearch: (e: string) => void;
  onPageChange: (value: number) => void;
  viewType: VIEW_TYPE;
  list: ProductData[];
  totalProducts: number;
  page: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onSearch,
  viewType,
  list,
  page,
  totalProducts,
  onPageChange,
}) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
      }}
    >
      <Box sx={{ mr: 3 }}>
        <AppSearch
          placeholder="Search here"
          onChange={(e: HTMLInputElement) => onSearch(e.value)}
        />
      </Box>

      <Stack
        spacing={2}
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          ml: "auto",
        }}
      >
        <IconBtn
          onClick={() => dispatch(setViewType(VIEW_TYPE.LIST))}
          className={clsx({
            active: viewType === VIEW_TYPE.LIST,
          })}
        >
          <ListIcon />
        </IconBtn>
        <IconBtn
          onClick={() => dispatch(setViewType(VIEW_TYPE.GRID))}
          className={clsx({
            active: viewType === VIEW_TYPE.GRID,
          })}
        >
          <AppsIcon />
        </IconBtn>
        <Hidden smDown>
          {list.length > 0 ? (
            <Box
              component="span"
              sx={{
                ml: { sm: "auto" },
              }}
            >
              <AppsPagination
                rowsPerPage={10}
                count={totalProducts}
                page={page}
                onPageChange={(_: any, page: number) => onPageChange(page)}
              />
            </Box>
          ) : null}
        </Hidden>
      </Stack>
    </Box>
  );
};

export default ProductHeader;
