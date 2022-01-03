import React, { useEffect } from "react";
import ProductImageSlide from "./ProductImageSlide";
import { useDispatch, useSelector } from "react-redux";
import AppCard from "../../../@crema/core/AppCard";
import Header from "./Header";
import ProductView from "./ProductView/index";
import AppGridContainer from "../../../@crema/core/AppGridContainer";
import SimilarProduct from "./SimilarProduct";

import { AppInfoView } from "../../../@crema";
import AppAnimate from "../../../@crema/core/AppAnimate";
import { getProductDetail } from "../../../redux/actions";
import { AppState } from "../../../redux/store";

interface ProductDetailProps {
  match: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { currentProduct } = useSelector<AppState, AppState["ecommerce"]>(
    ({ ecommerce }) => ecommerce
  );
  useEffect(() => {
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      {currentProduct ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppCard>
            <Header product={currentProduct} />
            <AppGridContainer>
              <ProductImageSlide product={currentProduct} />
              <ProductView product={currentProduct} />
            </AppGridContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </>
  );
};

export default ProductDetail;
