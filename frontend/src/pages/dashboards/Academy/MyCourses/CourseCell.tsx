import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";

interface CourseCellProps {
  course: {
    id: number;
    title: string;
    duration: string;
    rating: number;
    isCompleted: boolean;
    thumb: string;
  };
}

const CourseCell: React.FC<CourseCellProps> = ({ course }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      key={course.id}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { sm: "center" },
        py: 2,
        px: 5,
        "&:not(:last-of-type)": {
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        },
      }}
      className="item-hover"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: { xs: 3, md: 4 },
            "& .logo": {
              height: 60,
              width: 60,
              //borderRadius: theme.overrides.MuiCard.root.borderRadius,
              overflow: "hidden",
              display: "block",
            },
          }}
        >
          <img className="logo" alt="" src={course.thumb} />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              fontWeight: Fonts.MEDIUM,
              mb: 0.5,
              fontSize: 14,
            }}
            component="h3"
          >
            {course.title}
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            {course.duration}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          ml: { sm: "auto" },
          display: "flex",
          alignItems: "center",
        }}
      >
        {course.isCompleted ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mr: 2,
              }}
            >
              Rate
            </Box>
            <Button
              sx={{
                whiteSpace: "nowrap",
                width: 105,
              }}
              size="small"
              variant="contained"
              color="primary"
            >
              Certificate
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={"/assets/images/dashboard/academy/rating.svg"}
              alt="rating"
            />
            <Box
              sx={{
                mx: 2,
                fontSize: { xs: 14, xl: 16 },
              }}
              component="span"
            >
              {course.rating}
            </Box>
            <Button
              sx={{
                whiteSpace: "nowrap",
                width: 105,
              }}
              size="small"
              variant="outlined"
              color="primary"
            >
              View Course
            </Button>
          </Box>
        )}
        <Box
          sx={{
            ml: 1,
            mr: -2,
          }}
        >
          <IconButton
            aria-controls="alpha-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="alpha-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseCell;
