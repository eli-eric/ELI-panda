import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicTransferList from "./BasicTransferList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicTransferListSource from "!raw-loader!./BasicTransferList";
import EnhancedTransferList from "./EnhancedTransferList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import EnhancedTransferListSource from "!raw-loader!./EnhancedTransferList";

const TransferList = () => {
  return (
    <>
      <AppComponentHeader
        title="Transfer List"
        description='A transfer list (or "shuttle") enables the user to move one or more list items between lists.'
        refUrl="https://mui.com/components/transfer-list/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="Basic transfer list"
            component={BasicTransferList}
            source={BasicTransferListSource}
            noScrollbar
            description='For completeness, this example includes buttons for "move all", but not every transfer list needs these.'
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Enhanced transfer list"
            component={EnhancedTransferList}
            source={EnhancedTransferListSource}
            noScrollbar
            description='This example exchanges the "move all" buttons for a "select all / select none" checkbox, and adds a counter.'
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default TransferList;
