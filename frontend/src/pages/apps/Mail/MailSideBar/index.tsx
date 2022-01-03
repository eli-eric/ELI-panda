import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import IntlMessages from "@crema/utility/IntlMessages";
import AppScrollbar from "@crema/core/AppScrollbar";
import { useSelector } from "react-redux";
import ComposeMail from "../ComposeMail";
import ConnectionListItem from "./ConnectionListItem";
import AppsSideBarFolderItem from "@crema/core/AppsSideBarFolderItem";
import LabelItem from "./LabelItem";
import { Fonts } from "shared/constants/AppEnums";
import AppList from "@crema/core/AppList";
import ListEmptyResult from "@crema/core/AppList/ListEmptyResult";
import SidebarPlaceholder from "@crema/core/AppSkeleton/SidebarListSkeleton";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";
import { AppState } from "../../../../redux/store";

const MailSidebar = () => {
  const { labelList, connectionList, folderList } = useSelector<
    AppState,
    AppState["mailApp"]
  >(({ mailApp }) => mailApp);

  const [isComposeMail, setComposeMail] = useState<boolean>(false);

  const onOpenComposeMail = () => {
    setComposeMail(true);
  };

  const onCloseComposeMail = () => {
    setComposeMail(false);
  };

  return (
    <>
      {labelList && connectionList && folderList ? (
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
                  borderRadius: 30,
                  "& .MuiSvgIcon-root": {
                    fontSize: 26,
                  },
                }}
                startIcon={<AddIcon />}
                onClick={onOpenComposeMail}
              >
                <IntlMessages id="common.compose" />
              </Button>
            </Zoom>
          </Box>

          <AppScrollbar
            sx={{
              height: "calc(100% - 76px)",
            }}
          >
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
                aria-label="main mailbox folders"
              >
                <AppList
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
                      path={`/apps/mail/${item.alias}`}
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

              <List
                sx={{
                  mb: { xs: 2, xl: 5 },
                }}
                component="nav"
                aria-label="main mailbox folders"
              >
                <AppList
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
                  renderRow={(label) => (
                    <LabelItem key={label.id} label={label} />
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
                <IntlMessages id="common.connections" />
              </Box>

              <List style={{ paddingBottom: 0 }}>
                <AppList
                  data={connectionList}
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
                  renderRow={(connection) => (
                    <Box
                      key={connection.id}
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <ConnectionListItem connection={connection} />
                    </Box>
                  )}
                />
              </List>
            </Box>
          </AppScrollbar>
        </>
      ) : null}

      <ComposeMail
        isComposeMail={isComposeMail}
        onCloseComposeMail={onCloseComposeMail}
      />
    </>
  );
};

export default MailSidebar;
