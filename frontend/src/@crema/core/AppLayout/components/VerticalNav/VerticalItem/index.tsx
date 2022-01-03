import React, { useMemo } from "react";
import { Icon, ListItemText } from "@mui/material";
import clsx from "clsx";
import AppBadge from "@crema/core/AppBadge";
import AppNavLink from "@crema/core/AppNavLink";
import Box from "@mui/material/Box";
import IntlMessages from "../../../../../utility/IntlMessages";
import { checkPermission } from "../../../../../utility/helper/RouteHelper";
import { useAuthUser } from "../../../../../utility/AuthHooks";
import VerticalNavItem from "./VerticalNavItem";
import { RouterConfigData } from "../../../../../../pages/routesConfig";

interface VerticalItemProps {
  item: RouterConfigData;
  level: number;
}

const VerticalItem: React.FC<VerticalItemProps> = ({ level, item }) => {
  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item.permittedRole, user.role),
    [item.permittedRole, user.role]
  );
  if (!hasPermission) {
    return null;
  }

  return (
    <VerticalNavItem
      level={level}
      button
      component={AppNavLink}
      to={item.url}
      activeClassName="active"
      exact={item.exact}
    >
      {item.icon && (
        <Box component="span">
          <Icon
            sx={{
              fontSize: 18,
              display: "block",
              mr: 4,
            }}
            className={clsx("nav-item-icon", "material-icons-outlined")}
            color="action"
          >
            {item.icon}
          </Icon>
        </Box>
      )}
      <ListItemText
        className="nav-item-content"
        primary={<IntlMessages id={item.messageId} />}
        classes={{ primary: "nav-item-text" }}
      />
      {item.count && (
        <Box sx={{ mr: 3.5 }} className="menu-badge">
          <AppBadge count={item.count} color={item.color} />
        </Box>
      )}
    </VerticalNavItem>
  );
};

export default React.memo(VerticalItem);
