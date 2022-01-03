import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import ClickAway from "./ClickAway";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ClickAwaySource from "!raw-loader!./ClickAway";

import PortalClickAway from "./PortalClickAway";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PortalClickAwaySource from "!raw-loader!./PortalClickAway";

const ClickawayListener = () => {
  return (
    <>
      <AppComponentHeader
        title="Clickaway Listener"
        description="Detect if a click event happened outside of an element. It listens for clicks that occur somewhere in the document."
        refUrl="https://mui.com/components/click-away-listener"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="ClickAway"
            component={ClickAway}
            source={ClickAwaySource}
            description="For instance, if you need to hide a menu dropdown when people click anywhere else on your page:

"
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Portal Click Away"
            component={PortalClickAway}
            source={PortalClickAwaySource}
            description='The following demo uses Portal to render the dropdown into a new "subtree" outside of current DOM hierarchy.

'
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Portal Click Away"
            component={PortalClickAway}
            source={PortalClickAwaySource}
            description="By default, the component responds to the trailing events (click + touch end). However, you can configure it to respond to the leading events (mouse down + touch start).

.

"
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ClickawayListener;
