import React, { ReactNode } from "react";
import AppScrollbar from "@crema/core/AppScrollbar";
import List from "@mui/material/List";
import CachedIcon from "@mui/icons-material/Cached";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import SideBarItem from "./SideBarItem";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { AppCard } from "../../../../@crema";

export interface FaqFolderData {
  id: number;
  name: string | any;
  icon: ReactNode;
}

const faqFolderList: FaqFolderData[] = [
  { id: 101, name: <IntlMessages id="faq.general" />, icon: <CachedIcon /> },
  {
    id: 102,
    name: <IntlMessages id="knowledge.installation" />,
    icon: <SettingsOutlinedIcon />,
  },
  {
    id: 103,
    name: <IntlMessages id="faq.pricing" />,
    icon: <AttachMoneyIcon />,
  },
  {
    id: 104,
    name: <IntlMessages id="faq.licenseTypes" />,
    icon: <DescriptionOutlinedIcon />,
  },
  {
    id: 105,
    name: <IntlMessages id="faq.support" />,
    icon: <InsertEmoticonIcon />,
  },
];

interface FaqSideBarProps {
  onGetFaqData: (num: number) => void;
  selectionId: number;
}

const FaqSideBar: React.FC<FaqSideBarProps> = ({
  onGetFaqData,
  selectionId,
}) => {
  return (
    <AppCard>
      <AppScrollbar>
        <Box
          component="h3"
          sx={{ mb: 4, fontWeight: Fonts.BOLD, fontSize: 16 }}
        >
          <IntlMessages id="faq.queries" />
        </Box>
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            "& .listItem": {
              paddingLeft: "0",
              paddingRight: "0",
              paddingTop: 1,
              paddingBottom: 1,
              backgroundColor: "transparent",

              "& .MuiTypography-body1": {
                fontSize: 14,
                fontWeight: Fonts.MEDIUM,
              },

              "&:hover,&:focus,&.active": {
                backgroundColor: "transparent",
                color: "primary.main",

                "& svg": {
                  fontSize: 18,
                  color: "primary.main",
                },
              },

              "&.active": {
                color: "primary.main",
              },

              "& svg": {
                fontSize: 18,
              },
            },
          }}
        >
          {faqFolderList.map((item) => {
            return (
              <SideBarItem
                key={item.id}
                item={item}
                selectionId={selectionId}
                onGetFaqData={onGetFaqData}
              />
            );
          })}
        </List>
      </AppScrollbar>
    </AppCard>
  );
};

export default FaqSideBar;
