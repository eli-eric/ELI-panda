import React, { useState } from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import ReactPlayer from "react-player";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { VideoPromoData } from "types/models/dashboards/Academy";

const tabs = [
  { id: 1, title: "Class Detail", slug: "class" },
  { id: 2, title: "Assignments", slug: "assignments" },
  { id: 3, title: "Projects", slug: "projects" },
  { id: 4, title: "Exams", slug: "exams" },
];

interface VideoPromoProps {
  videoPromo: VideoPromoData;
}

const VideoPromo: React.FC<VideoPromoProps> = ({ videoPromo }) => {
  const [tabValue, setTabValue] = useState<string>("assignments");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <AppCard sxStyle={{ height: 1 }}>
      <Box
        sx={{
          mt: -5,
          mx: -6,
          "& .react-player": {
            width: "100% !important",
          },
        }}
      >
        <ReactPlayer
          className="react-player"
          controls={true}
          url="https://www.youtube.com/watch?v=X1dz0xRbSJc"
        />
      </Box>
      <Box
        sx={{
          pt: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "center" },
            mb: 1,
          }}
        >
          <Box
            sx={{
              flex: 1,
              mr: 2,
              mb: 2,
            }}
          >
            <Box
              component="p"
              sx={{
                fontSize: 14,
                fontWeight: Fonts.BOLD,
              }}
            >
              {videoPromo.title}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              component="p"
            >
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  position: "relative",
                  paddingRight: "6px",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: 5,
                    width: "1px",
                    height: 10,
                    backgroundColor: (theme) => theme.palette.grey[400],
                  },
                }}
              >
                {videoPromo.owner}
              </Box>
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  ml: 2,
                  position: "relative",
                  paddingRight: "6px",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: 5,
                    width: "1px",
                    height: 10,
                    backgroundColor: (theme) => theme.palette.grey[400],
                  },
                }}
              >
                {videoPromo.category}
              </Box>
              <Box
                component="span"
                sx={{
                  ml: 2,
                  color: "primary.main",
                }}
              >
                + Follow Mentor
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                border: "1px solid #E5E4EA",
                borderRadius: "5px",
              }}
            >
              <AccessTimeIcon />
            </Box>
            <Box
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                width: 40,
                border: "1px solid #E5E4EA",
                borderRadius: "5px",
                backgroundColor: "#EFEFEF",
              }}
            >
              <CloudDownloadIcon />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #E5E4EA",
          }}
        >
          <Tabs
            sx={{
              position: "relative",
              minHeight: 10,
            }}
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            aria-label="profile tabs"
          >
            {tabs.map((item, index) => {
              return (
                <Tab
                  sx={{
                    maxWidth: "none",
                    minWidth: 10,
                    minHeight: 10,
                    padding: "5px 10px",
                    textTransform: "capitalize",
                    fontSize: 14,
                    color: (theme) => theme.palette.text.secondary,
                    fontWeight: Fonts.MEDIUM,
                  }}
                  key={index}
                  value={item.slug}
                  label={item.title}
                />
              );
            })}
          </Tabs>
        </Box>

        {videoPromo.assignments.map((item, index) => (
          <Box
            key={index}
            sx={{
              mt: 5,
              p: 4,
              border: (theme) => `solid 1px ${theme.palette.grey[300]}`,
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <Box
              sx={{
                color: "text.primary",
                fontSize: 14,
                mb: 2,
                fontWeight: Fonts.MEDIUM,
              }}
              component="p"
            >{`${index + 1}. ${item.title} `}</Box>
            <Box
              sx={{
                mb: 4,
              }}
              component="p"
            >
              {item.desc}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { sm: "center" },
              }}
            >
              <Box
                sx={{
                  my: 1,
                  mr: { sm: "auto" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  size="small"
                  sx={{ fontSize: 10, whiteSpace: "nowrap" }}
                  variant="outlined"
                  color="primary"
                >
                  See Calendar
                </Button>
                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  <Button
                    size="small"
                    sx={{ fontSize: 10, whiteSpace: "nowrap" }}
                    variant="contained"
                    color="primary"
                  >
                    View details
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box component="span">{item.students} Students enrolled</Box>
                <Box
                  component="span"
                  sx={{
                    ml: 2,
                    color: "#F66F71",
                  }}
                >
                  {item.daysLeft} Days left
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </AppCard>
  );
};

export default VideoPromo;
