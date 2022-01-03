import React from "react";
import Card from "@mui/material/Card";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { Fonts } from "../../../shared/constants/AppEnums";
import { UserList } from "../../../@crema/services/db/userList";

interface ListItemProps {
  user: UserList;
}

const ListItem: React.FC<ListItemProps> = ({ user }) => {
  return (
    <Card
      sx={{
        p: 5,
        mb: 5,
      }}
      className="item-hover"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            mr: { sm: 5 },
            mb: { xs: 3, sm: 0 },
            ".crUserImage": {
              objectFit: "cover",
              borderRadius: 16,
              width: { sx: "100%", sm: 130 },
              height: { sx: 180, sm: 130 },
            },
          }}
        >
          <img src={user.image} alt="user" className="crUserImage" />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              color: "text.secondary",
            }}
          >
            <Box
              component="h3"
              sx={{
                mb: { xs: 2, sm: 0 },
                fontSize: 16,
                fontWeight: Fonts.BOLD,
              }}
            >
              {user.name}
            </Box>

            <Box
              sx={{
                ml: { xs: -4, sm: "auto" },
                mr: { sm: -4 },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "space-between", sm: "flex-end" },
                color: "text.secondary",
              }}
            >
              <Box sx={{ mx: 4 }} component="span">
                <Tooltip
                  sx={{
                    cursor: "pointer",
                  }}
                  title={<IntlMessages id="common.share" />}
                >
                  <ShareIcon />
                </Tooltip>
              </Box>

              <Box sx={{ mx: 4 }} component="span">
                <Tooltip
                  sx={{
                    cursor: "pointer",
                  }}
                  title={<IntlMessages id="common.bookmark" />}
                >
                  <BookmarkBorderIcon />
                </Tooltip>
              </Box>

              <Box sx={{ mx: 4 }} component="span">
                <Tooltip
                  sx={{
                    cursor: "pointer",
                  }}
                  title={<IntlMessages id="common.more" />}
                >
                  <MoreVertIcon />
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              pr: { lg: 6, xl: 16 },
            }}
          >
            <Box
              component="p"
              sx={{
                color: "text.secondary",
                mb: 4,
                fontSize: 14,
              }}
            >
              {user.information}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "center" },
            }}
          >
            <Box sx={{ mx: { xs: -1, xl: -2 } }}>
              {user.skills.map((skill, index) => {
                return (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[700]
                          : theme.palette.grey[200],
                      padding: "4px 12px",
                      marginTop: 2,
                      marginRight: { sx: 1, xl: 2 },
                      marginLeft: { sx: 1, xl: 2 },
                      border: "1px solid",
                      borderColor: grey[500],
                      borderRadius: 2,
                    }}
                  />
                );
              })}
            </Box>

            <Box
              sx={{
                ml: { md: "auto" },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginRight: 5,
                  marginTop: 2,
                  padding: "9px 12px",
                  lineHeight: 1,
                  width: 96,
                  fontWeight: Fonts.MEDIUM,
                }}
              >
                <IntlMessages id="common.hire" />
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.primary.contrastText,
                  color: grey[500],
                  marginTop: 2,
                  border: "1px solid",
                  borderColor: grey[500],
                  width: 96,
                  fontWeight: Fonts.MEDIUM,
                  padding: "9px 12px",
                  lineHeight: 1,
                }}
              >
                <IntlMessages id="mailApp.remove" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ListItem;
