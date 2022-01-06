import React, { useEffect } from "react";
import AppContentView from "@crema/core/AppContentView";
import { useAuthUser } from "../../utility/AuthHooks";
import {
  useLayoutActionsContext,
  useLayoutContext,
} from "../../utility/AppContextProvider/LayoutContextProvider";
import Layouts from "./Layouts";
import AuthWrapper from "./AuthWrapper";
import { useUrlSearchParams } from "use-url-search-params";
import { useSidebarActionsContext } from "../../utility/AppContextProvider/SidebarContextProvider";

const AppLayout = () => {
  const { navStyle } = useLayoutContext();
  const { isAuthenticated } = useAuthUser();
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const AppLayout = Layouts[navStyle];
  const [params] = useUrlSearchParams({}, {});

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout as string);
    if (params.menuStyle) updateMenuStyle(params.menuStyle as string);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, [params]);

  return (
    <>
      {isAuthenticated ? (
        <AppLayout />
      ) : (
        <AuthWrapper>
          <AppContentView />
        </AuthWrapper>
      )}
    </>
  );
};

export default React.memo(AppLayout);
