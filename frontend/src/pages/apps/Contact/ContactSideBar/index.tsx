import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import IntlMessages from "@crema/utility/IntlMessages";
import AppScrollbar from "@crema/core/AppScrollbar";
import CreateContact from "../CreateContact";
import LabelItem from "./LabelItem";
import AppsSideBarFolderItem from "@crema/core/AppsSideBarFolderItem";
import { Fonts } from "shared/constants/AppEnums";
import AppList from "@crema/core/AppList";
import ListEmptyResult from "@crema/core/AppList/ListEmptyResult";
import SidebarPlaceholder from "@crema/core/AppSkeleton/SidebarListSkeleton";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";
import { AppState } from "../../../../redux/store";

const SideBarContent = () => {
  const { labelList, folderList } = useSelector<
    AppState,
    AppState["contactApp"]
  >(({ contactApp }) => contactApp);

  const [isAddContact, onSetIsAddContact] = useState(false);

  const handleAddContactOpen = () => {
    onSetIsAddContact(true);
  };

  const handleAddContactClose = () => {
    onSetIsAddContact(false);
  };

  return (
    <>
      <Box
        sx={{
          px: { xs: 4, md: 5 },
          pt: { xs: 4, md: 5 },
          pb: 2.5,
        }}
      >
        <Zoom in style={{ transitionDelay: "300ms" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              padding: "8px 28px",
              borderRadius: 8,
              "& .MuiSvgIcon-root": {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleAddContactOpen}
          >
            <IntlMessages id="contactApp.createContact" />
          </Button>
        </Zoom>
      </Box>

      <AppScrollbar className="scroll-app-sidebar">
        <Box
          sx={{
            pr: 4,
            pb: { xs: 4, md: 5, lg: 6.2 },
          }}
        >
          <List
            sx={{
              mb: { xs: 2, xl: 5 },
            }}
            component="nav"
            aria-label="main task folders"
          >
            <AppList
              animation="transition.slideLeftIn"
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(item) => (
                <AppsSideBarFolderItem
                  key={item.id}
                  item={item}
                  path={`/apps/contact/folder/${item.alias}`}
                />
              )}
            />
          </List>

          <Box
            component="h4"
            sx={{
              mt: { xs: 4, xl: 5 },
              px: { xs: 4, md: 5, lg: 6.2 },
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            <IntlMessages id="common.labels" />
          </Box>

          <List component="nav" aria-label="main mailbox folders">
            <AppList
              animation="transition.slideLeftIn"
              data={labelList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(label) => <LabelItem key={label.id} label={label} />}
            />
          </List>

          <CreateContact
            isAddContact={isAddContact}
            handleAddContactClose={handleAddContactClose}
          />
        </Box>
      </AppScrollbar>
    </>
  );
};

export default SideBarContent;
