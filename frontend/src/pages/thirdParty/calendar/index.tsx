import React from "react";
import Grid from "@mui/material/Grid";

import AppComponentCard from "@crema/core/AppComponentCard";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Basic from "./Basic";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from "!raw-loader!./Basic";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import Timeslots from "./Timeslots";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TimeslotsSource from "!raw-loader!./Timeslots";
import Popup from "./Popup";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PopupSource from "!raw-loader!./Popup";
import Selectable from "./Selectable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SelectableSource from "!raw-loader!./Selectable";
import Dnd from "./Dnd";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DndSource from "!raw-loader!./Dnd";

const Calendar = () => {
  return (
    <>
      <AppComponentHeader
        title="React Big Calendar"
        refUrl="http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="Basic Calendar"
            component={Basic}
            source={BasicSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Dnd Calendar"
            component={Dnd}
            source={DndSource}
          />
        </Grid>

        <Grid item xs={12}>
          <AppComponentCard
            title="Timeslots Calendar"
            component={Timeslots}
            source={TimeslotsSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Popup Calendar"
            component={Popup}
            source={PopupSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Selectable Calendar"
            component={Selectable}
            source={SelectableSource}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Calendar;
