import React from "react";
import Card from "@mui/material/Card";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Checkbox } from "@mui/material";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { green } from "@mui/material/colors";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentProduct } from "../../../../../redux/actions";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { ProductData } from "types/models/ecommerce/EcommerceApp";

interface GridItemProps {
  item: ProductData;
}

const GridItem: React.FC<GridItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card
      sx={{
        p: 5,
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="item-hover"
      onClick={() => {
        dispatch(setCurrentProduct(item));
        history.push("/ecommerce/product_detail/" + item.id);
      }}
    >
      <Box
        sx={{
          mt: 2,
          mb: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="span"
          sx={{
            maxHeight: 28,
            width: 48,
            color: "primary.contrastText",
            backgroundColor: green[500],
            pt: 1.5,
            pb: 1,
            px: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: Fonts.MEDIUM,
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          <Box component="span" sx={{ pb: 1.25 }}>
            {item.rating}
          </Box>
          <Box
            component="span"
            sx={{
              ml: 1,
            }}
          >
            <StarBorderIcon
              sx={{
                fontSize: 16,
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            mx: 2,
            maxHeight: { xs: 140, sm: 200, md: 260 },
            minHeight: { xs: 140, sm: 200, md: 260 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "& img": {
              maxHeight: "100%",
              maxWidth: "100%",
            },
          }}
        >
          <img src={item.image[0].src} alt="watch" />
        </Box>
        <Box
          sx={{
            mt: -3,
          }}
        >
          <Checkbox
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteOutlinedIcon />}
          />
        </Box>
      </Box>

      <Box
        sx={{
          mb: 1,
          color: "text.primary",
          fontWeight: Fonts.BOLD,
          fontSize: 16,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        component="h3"
      >
        {item.title}
      </Box>

      <Box
        component="p"
        sx={{
          mb: 3,
          color: "text.secondary",
          fontSize: 14,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.description}
      </Box>

      <Box
        sx={{
          mx: -1,
          mt: "auto",
          display: "flex",
          alignItems: "center",
          fontWeight: Fonts.MEDIUM,
          justifyContent: "space-between",
          fontSize: { xs: 12, xl: 14 },
        }}
      >
        <Box>
          <Box
            component="span"
            sx={{
              px: 1,
              mb: 2,
              color: "text.primary",
            }}
          >
            $ {+item.mrp - Math.round((+item.mrp * +item.discount) / 100)}
          </Box>
          <Box
            component="span"
            sx={{
              px: 1,
              mb: 2,
              color: "text.disabled",
              textDecoration: "line-through",
            }}
          >
            ${item.mrp}
          </Box>
          <Box
            component="span"
            sx={{
              px: 1,
              mb: 2,
              color: green[500],
            }}
          >
            {item.discount}% <IntlMessages id="ecommerce.off" />
          </Box>
        </Box>
        <Box sx={{ ml: 2 }}>
          <AddShoppingCartOutlinedIcon sx={{ fontSize: 16, mt: 1 }} />
        </Box>
      </Box>
    </Card>
  );
};

export default GridItem;
