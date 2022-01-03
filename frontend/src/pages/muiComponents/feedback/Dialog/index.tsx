import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import SimpleDialog from "./SimpleDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleDialogSource from "!raw-loader!./SimpleDialog";

import AlertDialog from "./AlertDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AlertDialogSource from "!raw-loader!./AlertDialog";

import AlertDialogSlide from "./AlertDialogSlide";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AlertDialogSlideSource from "!raw-loader!./AlertDialogSlide";

import FormDialog from "./FormDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FormDialogSource from "!raw-loader!./FormDialog";

import CustomizedDialogs from "./CustomizedDialogs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedDialogsSource from "!raw-loader!./CustomizedDialogs";

import FullScreenDialog from "./FullScreenDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FullScreenDialogSource from "!raw-loader!./FullScreenDialog";

import MaxWidthDialog from "./MaxWidthDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MaxWidthDialogSource from "!raw-loader!./MaxWidthDialog";

import ResponsiveDialog from "./ResponsiveDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ResponsiveDialogSource from "!raw-loader!./ResponsiveDialog";

import ConfirmationDialog from "./ConfirmationDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ConfirmationDialogSource from "!raw-loader!./ConfirmationDialog";

import DraggableDialog from "./DraggableDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DraggableDialogSource from "!raw-loader!./DraggableDialog";

import ScrollDialog from "./ScrollDialog";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ScrollDialogSource from "!raw-loader!./ScrollDialog";

const Dialog = () => {
  return (
    <>
      <AppComponentHeader
        title="Dialog"
        description="Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks."
        refUrl="https://mui.com/components/dialogs/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Alert Dialog"
            component={AlertDialog}
            source={AlertDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Alert Dialog Slide"
            component={AlertDialogSlide}
            source={AlertDialogSlideSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Form Dialog"
            component={FormDialog}
            source={FormDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customized Dialogs"
            component={CustomizedDialogs}
            source={CustomizedDialogsSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="FullScreen Dialogs"
            component={FullScreenDialog}
            source={FullScreenDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Max Width Dialog"
            component={MaxWidthDialog}
            source={MaxWidthDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Responsive Dialog"
            component={ResponsiveDialog}
            source={ResponsiveDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="DraggableDialog"
            component={DraggableDialog}
            source={DraggableDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Scroll Dialog"
            component={ScrollDialog}
            source={ScrollDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Simple Dialog"
            component={SimpleDialog}
            source={SimpleDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="ConfirmationDialog"
            component={ConfirmationDialog}
            source={ConfirmationDialogSource}
            noScrollbar
            description="Simple dialogs can provide additional details or actions about a list item. For example, they can display avatars, icons, clarifying subtext, or orthogonal actions (such as adding an account)."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Dialog;
