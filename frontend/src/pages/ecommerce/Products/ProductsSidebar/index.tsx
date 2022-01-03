import React, { useEffect, useState } from "react";
import ProductsCategory from "./ProductsCategory";
import { Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import Divider from "@mui/material/Divider";
import PriceSelector from "./PriceSelector";
import AppScrollbar from "../../../../@crema/core/AppScrollbar";
import AppList from "../../../../@crema/core/AppList";
import CheckedCell from "./CheckedCell";
import {
  brandData,
  discountList,
  idealFor,
  productColors,
} from "../../../../@crema/services/db/ecommerce/ecommerceData";
import AppGrid from "../../../../@crema/core/AppGrid";
import ColorCell from "./ColorCell";
import RatingCell from "./RatingCell";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../../../redux/actions";
import { AppState } from "../../../../redux/store";

const ProductSidebar = () => {
  const dispatch = useDispatch();
  const { filterData } = useSelector<AppState, AppState["ecommerce"]>(
    ({ ecommerce }) => ecommerce
  );
  const [selectedBrand, setSelectedBrand] = useState<number[]>(
    filterData.brand
  );
  const [selectedFor, setSelectedFor] = useState(filterData.ideaFor);
  const [selectedDiscount, setSelectedDiscount] = useState(filterData.discount);
  const [selectedColor, setSelectedColor] = useState(filterData.color);
  const [customerRating, setCustomerRating] = useState(filterData.rating);

  useEffect(() => {
    dispatch(
      setFilters({
        title: filterData.title,
        brand: selectedBrand,
        ideaFor: selectedFor,
        discount: selectedDiscount,
        color: selectedColor,
        rating: customerRating,
      })
    );
  }, [
    dispatch,
    filterData.title,
    selectedBrand,
    selectedFor,
    selectedDiscount,
    selectedColor,
    customerRating,
  ]);

  const onSelectBrand = (brandId: any) => {
    if (selectedBrand.some((brand) => brand === brandId)) {
      setSelectedBrand(selectedBrand.filter((brand) => brand !== brandId));
    } else {
      setSelectedBrand(selectedBrand.concat(brandId));
    }
  };

  const onSelectFor = (id: number) => {
    if (selectedFor.some((item: number) => item === id)) {
      setSelectedFor(selectedFor.filter((item: number) => item !== id));
    } else {
      setSelectedFor(selectedFor.concat(id));
    }
  };

  const onSelectDiscount = (id: number) => {
    if (selectedDiscount.some((item: number) => item === id)) {
      setSelectedDiscount(
        selectedDiscount.filter((item: number) => item !== id)
      );
    } else {
      setSelectedDiscount(selectedDiscount.concat(id));
    }
  };

  const onSelectColor = (id: number) => {
    if (selectedColor.some((item: number) => item === id)) {
      setSelectedColor(selectedColor.filter((item: number) => item !== id));
    } else {
      setSelectedColor(selectedColor.concat(id));
    }
  };

  const onSelectRating = (id: number) => {
    if (customerRating.some((item: number) => item === id)) {
      setCustomerRating(customerRating.filter((item: number) => item !== id));
    } else {
      setCustomerRating(customerRating.concat(id));
    }
  };

  return (
    <AppScrollbar>
      <Box
        sx={{
          p: 6,
        }}
      >
        <Box
          component="h5"
          sx={{
            mb: 2,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          Filter By
        </Box>
        <Box
          sx={{
            color: "text.secondary",
            mb: 4,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          CATEGORIES
        </Box>
        <ProductsCategory />
        <Divider
          sx={{
            mt: 4,
          }}
        />
        <Box
          sx={{
            color: "text.secondary",
            my: 4,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          PRICE
        </Box>
        <PriceSelector />
        <Divider
          sx={{
            mt: 4,
          }}
        />
        <Box
          sx={{
            color: "text.secondary",
            my: 4,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          BRAND
          <AppList
            data={brandData}
            renderRow={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectBrand}
                selected={selectedBrand}
              />
            )}
          />
        </Box>
        <Divider
          sx={{
            mt: 4,
          }}
        />
        <Box
          sx={{
            color: "text.secondary",
            my: 4,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          IDEAL FOR
          <AppList
            data={idealFor}
            renderRow={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={() => onSelectFor(data.id)}
                selected={selectedFor}
              />
            )}
          />
        </Box>
        <Divider
          sx={{
            mt: 4,
          }}
        />
        <Box
          sx={{
            color: "text.secondary",
            my: 4,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          DISCOUNT
          <AppList
            data={discountList}
            renderRow={(data) => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={onSelectDiscount}
                selected={selectedDiscount}
              />
            )}
          />
        </Box>
        <Divider
          sx={{
            mt: 4,
          }}
        />
        <Box
          sx={{
            color: "text.secondary",
            my: 4,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          <Box sx={{ mb: 3 }}>COLOR</Box>

          <AppGrid
            data={Object.values(productColors)}
            column={6}
            itemPadding={10}
            renderRow={(data, index) => (
              <ColorCell
                key={"color-" + index}
                data={data}
                selected={selectedColor}
                onChange={onSelectColor}
              />
            )}
          />
        </Box>
        <Divider
          sx={{
            mt: 4,
          }}
        />
        <Box
          sx={{
            color: "text.secondary",
            my: 4,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          CUSTOMER RATINGS
          <AppList
            data={[5, 4, 3, 2, 1]}
            renderRow={(data) => (
              <RatingCell
                key={data}
                data={data}
                onChange={onSelectRating}
                selected={customerRating}
              />
            )}
          />
        </Box>
      </Box>
    </AppScrollbar>
  );
};

export default ProductSidebar;
