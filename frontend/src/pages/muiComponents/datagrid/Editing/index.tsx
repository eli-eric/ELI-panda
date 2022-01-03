import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicEditingGrid from "./BasicEditingGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicEditingGridSource from "!raw-loader!./BasicEditingGrid";

import IsCellEditableGrid from "./IsCellEditableGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import IsCellEditableGridSource from "!raw-loader!./IsCellEditableGrid";

import CellEditControlGrid from "./CellEditControlGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CellEditControlGridSource from "!raw-loader!./CellEditControlGrid";

import ValueGetterSetterGrid from "./ValueGetterSetterGrid";
import ValueGetterSetterGridSource from "./ValueGetterSetterGrid";

import ValidateRowModelControlGrid from "./ValidateRowModelControlGrid";
import ValidateRowModelControlGridSource from "./ValidateRowModelControlGrid";

import ValidateServerNameGrid from "./ValidateServerNameGrid";
import ValidateServerNameGridSource from "./ValidateServerNameGrid";

import RenderRatingEditCellGrid from "./RenderRatingEditCellGrid";
import RenderRatingEditCellGridSource from "./RenderRatingEditCellGrid";

import StartEditButtonGrid from "./StartEditButtonGrid";
import StartEditButtonGridSource from "./StartEditButtonGrid";

import CatchEditingEventsGrid from "./CatchEditingEventsGrid";
import CatchEditingEventsGridSource from "./CatchEditingEventsGrid";

import BasicRowEditingGrid from "./BasicRowEditingGrid";
import BasicRowEditingGridSource from "./BasicRowEditingGrid";

import RowEditControlGrid from "./RowEditControlGrid";
import RowEditControlGridSource from "./RowEditControlGrid";

import ConditionalValidationGrid from "./ConditionalValidationGrid";
import ConditionalValidationGridSource from "./ConditionalValidationGrid";

const Editing = () => {
  return (
    <>
      <AppComponentHeader
        title="Editing"
        description="The data grid has built-in edit capabilities that you can customize to your needs."
        refUrl="https://mui.com/components/data-grid/editing/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="BasicEditingGrid"
            component={BasicEditingGrid}
            source={BasicEditingGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="IsCellEditableGrid"
            component={IsCellEditableGrid}
            source={IsCellEditableGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="CellEditControlGrid"
            component={CellEditControlGrid}
            source={CellEditControlGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ValueGetterSetterGrid"
            component={ValueGetterSetterGrid}
            source={ValueGetterSetterGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ValidateRowModelControlGrid"
            component={ValidateRowModelControlGrid}
            source={ValidateRowModelControlGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ValidateServerNameGrid"
            component={ValidateServerNameGrid}
            source={ValidateServerNameGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="RenderRatingEditCellGrid"
            component={RenderRatingEditCellGrid}
            source={RenderRatingEditCellGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="StartEditButtonGrid"
            component={StartEditButtonGrid}
            source={StartEditButtonGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="CatchEditingEventsGrid"
            component={CatchEditingEventsGrid}
            source={CatchEditingEventsGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="BasicRowEditingGrid"
            component={BasicRowEditingGrid}
            source={BasicRowEditingGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="RowEditControlGrid"
            component={RowEditControlGrid}
            source={RowEditControlGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ConditionalValidationGrid"
            component={ConditionalValidationGrid}
            source={ConditionalValidationGridSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Editing;
