import React, { ReactNode } from "react";
import { BiAlignLeft } from "react-icons/bi";
import { RoutePermittedRole } from "../shared/constants/AppConst";

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
}

const routesConfig: RouterConfigData[] = [
  {
    id: "app",
    title: "Sample",
    messageId: "sidebar.sample",
    type: "group",
    children: [
      {
        id: "page-1",
        title: "Page 1",
        messageId: "sidebar.sample.page1",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/sample/page-1",
      },
      {
        id: "page-2",
        title: "Page 2",
        messageId: "sidebar.sample.page2",
        type: "item",
        icon: <BiAlignLeft />,
        url: "/sample/page-2",
      },
    ],
  },
];
export default routesConfig;
