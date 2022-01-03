import React from "react";
import clsx from "clsx";
import AppContentView from "@crema/core/AppContentView";
import AppFixedFooter from "./AppFixedFooter";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import AppThemeSetting from "../../AppThemeSetting";
import HorDarkWrapper from "./HorDarkWrapper";
import MainContent from "./MainContent";
import { LayoutType } from "../../../../shared/constants/AppEnums";
import HorDarkContainer from "./HorDarkContainer";

const HorDarkLayout = () => {
  const { footer, layoutType, footerType } = useLayoutContext();

  return (
    <HorDarkContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorDarkWrapper
        className={clsx("horDarkWrapper", {
          appMainFooter: footer && footerType === "fluid",
          appMainFixedFooter: footer && footerType === "fixed",
        })}
      >
        <AppSidebar />

        <MainContent>
          <AppHeader />
          <AppContentView />
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </HorDarkWrapper>
    </HorDarkContainer>
  );
};

export default HorDarkLayout;
