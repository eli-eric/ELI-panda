import React from "react";
import AppSidebar from "./AppSidebar";
import { AppContentView } from "../../../index";
import AppThemeSetting from "../../AppThemeSetting";
import AppHeader from "./AppHeader";
import clsx from "clsx";
import Box from "@mui/material/Box";
import StandardWrapper from "./StandardWrapper";
import AppFixedFooter from "./AppFixedFooter";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import { LayoutType } from "../../../../shared/constants/AppEnums";
import StandardContainer from "./StandardContainer";

const Standard = () => {
  const { footer, layoutType, footerType } = useLayoutContext();

  return (
    <StandardContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <StandardWrapper
        className={clsx("standardWrapper", {
          appMainFooter: footer && footerType === "fluid",
          appMainFixedFooter: footer && footerType === "fixed",
        })}
      >
        <AppHeader />
        <Box className="mainContent">
          <AppSidebar />
          <AppContentView />
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </StandardWrapper>
    </StandardContainer>
  );
};

export default Standard;
