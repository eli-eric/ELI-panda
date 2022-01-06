import React from "react";
import clsx from "clsx";
import AppContentView from "@crema/core/AppContentView";
import AppFixedFooter from "./AppFixedFooter";
import AppHeader from "./AppHeader";
import { useLayoutContext } from "../../../utility/AppContextProvider/LayoutContextProvider";
import AppThemeSetting from "../../AppThemeSetting";
import DefaultLayoutWrapper from "./DefaultLayoutWrapper";
import MainContent from "./MainContent";
import { LayoutType } from "../../../../shared/constants/AppEnums";
import AppSidebar from "./AppSidebar";
import DefaultLayoutContainer from "./DefaultLayoutContainer";

const DefaultLayout = () => {
  const { footer, layoutType, headerType, footerType } = useLayoutContext();

  return (
    <DefaultLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DefaultLayoutWrapper
        className={clsx("defaultLayoutWrapper", {
          appMainFooter: footer && footerType === "fluid",
          appMainFixedFooter: footer && footerType === "fixed",
          appMainFixedHeader: headerType === "fixed",
        })}
      >
        <AppSidebar />

        <MainContent>
          <AppHeader />
          <AppContentView />
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </DefaultLayoutWrapper>
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
