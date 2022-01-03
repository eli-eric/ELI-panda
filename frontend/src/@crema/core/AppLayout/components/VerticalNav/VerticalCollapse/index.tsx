import React, { useEffect, useMemo, useState } from "react";
import { Collapse, Icon, IconButton, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import VerticalItem from "../VerticalItem";
import Box from "@mui/material/Box";
import IntlMessages from "../../../../../utility/IntlMessages";
import { checkPermission } from "../../../../../utility/helper/RouteHelper";
import { useAuthUser } from "../../../../../utility/AuthHooks";
import { useThemeContext } from "../../../../../utility/AppContextProvider/ThemeContextProvider";
import { useSidebarContext } from "../../../../../utility/AppContextProvider/SidebarContextProvider";
import VerticalCollapseItem from "./VerticalCollapseItem";
import { RouterConfigData } from "../../../../../../pages/routesConfig";

const needsToBeOpened = (pathname: string, item: RouterConfigData): boolean => {
  return !!(pathname && isUrlInChildren(item, pathname));
};

const isUrlInChildren = (parent: RouterConfigData, url: string): boolean => {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }

    if (
      parent.children[i].url === url ||
      url.includes(parent.children[i].url || "")
    ) {
      return true;
    }
  }

  return false;
};

interface VerticalCollapseProps {
  item: RouterConfigData;
  level: number;
}

const VerticalCollapse: React.FC<VerticalCollapseProps> = ({ item, level }) => {
  const { theme } = useThemeContext();
  const { sidebarTextColor } = useSidebarContext();
  const { pathname } = useLocation();
  const [open, setOpen] = useState<boolean>(() =>
    needsToBeOpened(pathname, item)
  );

  useEffect(() => {
    if (needsToBeOpened(pathname, item)) {
      setOpen(true);
    }
  }, [pathname, item]);

  const handleClick = () => {
    setOpen(!open);
  };

  const { user } = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item.permittedRole, user.role),
    [item.permittedRole, user.role]
  );

  if (!hasPermission) {
    return null;
  }

  return (
    <>
      <VerticalCollapseItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        button
        component="div"
        className={clsx("menu-vertical-collapse", open && "open")}
        onClick={handleClick}
      >
        {item.icon && (
          <Box component="span">
            <Icon
              sx={{ mr: 4 }}
              color="action"
              className={clsx("nav-item-icon")}
            >
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
          }}
          className="nav-item-content"
          classes={{ primary: clsx("nav-item-text") }}
          primary={<IntlMessages id={item.messageId} />}
        />
        <IconButton
          className="nav-item-icon-arrow-btn"
          sx={{ p: 0, mr: 0.75 }}
          disableRipple
          size="large"
        >
          <Icon className="nav-item-icon-arrow" color="inherit">
            {open
              ? "expand_more"
              : theme.direction === "ltr"
              ? "chevron_right"
              : "chevron_left"}
          </Icon>
        </IconButton>
      </VerticalCollapseItem>

      {item.children && (
        <Collapse in={open} className="collapse-children">
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "collapse" && (
                <VerticalCollapse item={item} level={level + 1} />
              )}

              {item.type === "item" && (
                <VerticalItem item={item} level={level + 1} />
              )}
            </React.Fragment>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default React.memo(VerticalCollapse);
