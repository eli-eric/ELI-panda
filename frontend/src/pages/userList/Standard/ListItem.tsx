import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";

import { Fonts } from "../../../shared/constants/AppEnums";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { UserList } from "../../../@crema/services/db/userList";

interface ListItemProps {
  user: UserList;
}

const ListItem: React.FC<ListItemProps> = ({ user }) => {
  return (
    <Box sx={{ mb: 8 }} className="item-hover">
      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              color: "primary.contrastText",
              width: { xs: "100%", sm: 200, xl: 256 },
              p: { xs: 3, lg: 5 },
              bgcolor: "primary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Avatar
                src={user.image}
                sx={{
                  height: 85,
                  width: 85,
                }}
              />
            </Box>
            <Box
              component="h3"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                textAlign: "center",
                mb: 3,
                fontSize: 16,
                fontWeight: Fonts.BOLD,
              }}
            >
              {user.name}
            </Box>
            <Chip
              label={`@${user.charge}/Hour`}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.contrastText,
                color: "#484848",
                paddingRight: 4,
                paddingLeft: 4,
                fontWeight: Fonts.MEDIUM,
              }}
            />
          </Box>

          <Box
            sx={{
              p: 5,
              flex: 1,
            }}
          >
            <Box
              sx={{
                mb: { xs: 2, xl: 3 },
                color: "grey.600",
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                alignItems: { lg: "center" },
              }}
            >
              <Box
                sx={{
                  mx: -3,
                  mb: 2,
                  color: "text.primary",
                  pr: { xl: 32 },
                  display: "flex",
                  flex: 1,
                  fontSize: { xs: 14, xl: 16 },
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <MailIcon />
                  <Box
                    sx={{
                      ml: 2,
                    }}
                  >
                    {user.email}
                  </Box>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <LanguageIcon />
                  <Box
                    sx={{
                      ml: 2,
                    }}
                  >
                    {user.website}
                  </Box>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <PhoneIcon />
                  <Box
                    sx={{
                      ml: 2,
                    }}
                  >
                    {user.phone}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  mx: { xs: -1, xl: -4 },
                  mb: 2,
                  pl: { lg: 6, xl: 10 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "space-between", sm: "flex-start" },
                  color: "text.primary",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    cursor: "pointer",
                    mx: { xs: 1, xl: 4 },
                  }}
                >
                  <FacebookIcon />
                </Box>
                <Box
                  component="span"
                  sx={{
                    cursor: "pointer",
                    mx: { xs: 1, xl: 4 },
                  }}
                >
                  <LinkedInIcon />
                </Box>
                <Box
                  component="span"
                  sx={{
                    cursor: "pointer",
                    mx: { xs: 1, xl: 4 },
                  }}
                >
                  <InstagramIcon />
                </Box>
                <Box
                  component="span"
                  sx={{
                    cursor: "pointer",
                    mx: { xs: 1, xl: 4 },
                  }}
                >
                  <TwitterIcon />
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
                  fontWeight: Fonts.LIGHT,
                }}
              >
                {user.information}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: { md: "center" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  mx: { xs: -1, xl: -2 },
                }}
              >
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
                        marginRight: { xs: 1, xl: 2 },
                        marginLeft: { xs: 1, xl: 2 },
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
                    color: "grey.500",
                    marginTop: 2,
                    border: "1px solid",
                    borderColor: "grey.500",
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
    </Box>
  );
};

export default ListItem;
