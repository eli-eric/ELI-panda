import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import ContactList from "./ContactList";
import ChatList from "./ChatList";
import AppScrollbar from "@crema/core/AppScrollbar";
import IntlMessages from "@crema/utility/IntlMessages";
import { Fonts } from "shared/constants/AppEnums";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { ConnectionObj } from "types/models/apps/Chat";
import { styled } from "@mui/material/styles";

const TabLabel = styled(Tab)(() => {
  return {
    minWidth: 10,
    minHeight: 50,
    fontSize: 14,
    flex: 1,
    textTransform: "capitalize",
    fontWeight: Fonts.MEDIUM,
    "& .MuiTab-wrapper": {
      flexDirection: "row",
    },
    "& .MuiSvgIcon-root": {
      marginBottom: "0 !important",
      display: "block",
      marginRight: 10,
      fontSize: 20,
    },
  };
});

const tabs = [
  { id: 1, name: <IntlMessages id="dashboard.messages" /> },
  { id: 2, name: <IntlMessages id="chatApp.contacts" /> },
];

interface UserTabsProps {
  connectionListData: ConnectionObj[];
  chatListData: ConnectionObj[];
  loading: boolean;
}

const UserTabs: React.FC<UserTabsProps> = ({
  connectionListData,
  chatListData,
  loading,
}) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  };

  return (
    <>
      <Box
        sx={{
          pb: 2,
          width: 1,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
            position: "relative",
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
            },
          }}
        >
          {tabs.map((tab, index) => {
            return (
              <TabLabel
                key={tab.id}
                icon={
                  tab.id === 1 ? (
                    <ChatOutlinedIcon />
                  ) : (
                    <AccountBoxOutlinedIcon />
                  )
                }
                label={tab.name}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </Box>

      <AppScrollbar
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 175px)",
        }}
      >
        <Box
          sx={{
            pb: 2,
            flex: 1,
          }}
        >
          {value === 0 && (
            <>
              {chatListData.length > 0 ? (
                <Box
                  sx={{
                    pt: 2,
                    pb: 1,
                    px: 5,
                    fontWeight: Fonts.SEMI_BOLD,
                  }}
                  component="h4"
                >
                  Connections
                </Box>
              ) : null}
              <ChatList chatListData={chatListData} loading={loading} />
            </>
          )}
          {value === 1 && (
            <>
              {connectionListData.length > 0 ? (
                <Box
                  sx={{
                    pt: 2,
                    pb: 1,
                    px: 5,
                    fontWeight: Fonts.SEMI_BOLD,
                  }}
                  component="h4"
                >
                  Contacts
                </Box>
              ) : null}
              <ContactList
                connectionListData={connectionListData}
                loading={loading}
              />
            </>
          )}
        </Box>
      </AppScrollbar>
    </>
  );
};

export default UserTabs;
