import React from "react";
import Card from "@mui/material/Card";
import { Checkbox } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Rating from "@mui/lab/Rating";
import Slider from "react-slick";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { green, grey } from "@mui/material/colors";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentProduct } from "../../../../../redux/actions";
import MediaSlider from "./MediaSlider";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { ProductData } from "types/models/ecommerce/EcommerceApp";

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface ListItemProps {
  item: ProductData;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Card
      sx={{
        p: 5,
        mb: 4,
        cursor: "pointer",
      }}
      className="item-hover"
      onClick={() => {
        dispatch(setCurrentProduct(item));
        history.push("/ecommerce/product_detail/" + item.id);
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            pr: { xs: 0, sm: 4 },
            mb: { xs: 3, sm: 0 },
            maxWidth: "100%",
            textAlign: "center",
            width: { sm: "8rem", xl: "10rem" },
          }}
        >
          <MediaSlider>
            <Slider {...settings}>
              {item.image.map((img) => {
                return (
                  <Box
                    sx={{
                      mb: 2,
                      textAlign: "center",
                      maxHeight: 140,
                      minHeight: 140,
                      position: "relative",
                      "& img": {
                        maxHeight: "100%",
                        maxWidth: "100%",
                      },
                    }}
                    key={img.id}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img src={img.src} alt="watch" />
                    </Box>
                  </Box>
                );
              })}
            </Slider>
          </MediaSlider>
        </Box>

        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(100% - 8rem)",
              xl: "calc(100% - 10rem)",
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              mt: -4,
            }}
          >
            <Box
              component="h3"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "calc(100% - 40px)",
              }}
            >
              {item.title}
            </Box>

            <Box
              component="span"
              sx={{
                ml: "auto",
                display: "block",
                textAlign: "right",
                "& .MuiCheckbox-root": {
                  padding: 3,
                },
              }}
            >
              <Checkbox
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteOutlinedIcon />}
              />
            </Box>
          </Box>

          <Box
            component="p"
            sx={{
              color: "text.secondary",
              mb: 5,
              fontSize: 14,
            }}
          >
            {item.description}
          </Box>

          <Box
            sx={{
              mb: { xs: 3, xl: 5 },
              display: "flex",
              flexWrap: "wrap",
              fontSize: { xs: 12, xl: 14 },
            }}
          >
            <Box
              sx={{
                mr: { xs: 2, xl: 4 },
                mb: 1,
                pr: { xs: 2, xl: 4 },
                borderRight: 1,
                borderColor: grey[200],
              }}
            >
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  fontWeight: Fonts.MEDIUM,
                  textTransform: "uppercase",
                }}
              >
                <IntlMessages id="ecommerce.exclusivePrice" />:
              </Box>
              <Box
                component="span"
                sx={{
                  ml: 2,
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                ${+item.mrp - Math.round((+item.mrp * +item.discount) / 100)}
              </Box>
            </Box>
            <Box
              sx={{
                mr: { xs: 2, xl: 4 },
                mb: 1,
                pr: { xs: 2, xl: 4 },
                color: "text.secondary",
                borderRight: 1,
                borderColor: "primary.main",
              }}
            >
              <IntlMessages id="ecommerce.mrp" />:
              <Box
                component="span"
                sx={{
                  textDecoration: "line-through",
                }}
              >
                ${item.mrp}
              </Box>
            </Box>
            <Box
              sx={{
                mb: 1,
                fontWeight: Fonts.MEDIUM,
                color: green[600],
              }}
            >
              {item.discount}% <IntlMessages id="ecommerce.off" />
            </Box>
          </Box>

          <Box
            sx={{
              mt: "auto",
              mb: -3,
              mx: { xs: -2, xl: -3 },
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                px: { xs: 2, xl: 3 },
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  mr: 1,
                }}
              >
                <AddShoppingCartOutlinedIcon sx={{ fontSize: 16, mt: 1 }} />
              </Box>
              <Box
                component="span"
                sx={{
                  fontSize: 14,
                }}
              >
                <IntlMessages id="ecommerce.addToCart" />
              </Box>
            </Box>
            <Box
              sx={{
                px: { xs: 2, xl: 3 },
                mb: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ mt: 1.5 }}>
                <Rating size="small" value={item.rating} readOnly />
              </Box>
              <Box
                sx={{
                  ml: 2,
                }}
              >{`(${item.reviews})`}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ListItem;
