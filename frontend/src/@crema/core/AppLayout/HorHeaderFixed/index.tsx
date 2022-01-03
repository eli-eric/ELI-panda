import React from "react";
import clsx from "clsx";
import AppContentView from "@crema/core/AppContentView";
import AppFixedFooter from "./AppFixedFooter";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import AppThemeSetting from "../../AppThemeSetting";
import HorHeaderFixedWrapper from "./HorHeaderFixedWrapper";
import MainContent from "./MainContent";
import { LayoutType } from "../../../../shared/constants/AppEnums";
import HorHeaderFixedContainer from "./HorHeaderFixedContainer";

const HorHeaderFixed = () => {
  const { footer, layoutType, footerType } = useLayoutContext();

  return (
    <HorHeaderFixedContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorHeaderFixedWrapper
        className={clsx("horHeaderFixedWrapper", {
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
      </HorHeaderFixedWrapper>
    </HorHeaderFixedContainer>
  );
};

export default HorHeaderFixed;
