import React from "react";
import { styled } from "@mui/material/styles";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import AppList from "@crema/core/AppList";
import { useIntl } from "react-intl";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiErrorCircle, BiPhone } from "react-icons/bi";
import { FiThumbsUp } from "react-icons/fi";
import { MdPublic } from "react-icons/md";
import { AbutData } from "types/models/apps/Wall";

const AboutItemRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "&:not(:last-of-type)": {
    marginBottom: 16,
  },
  "&:first-of-type": {
    alignItems: "flex-start",
  },
  "&:hover $editBtnRoot": {
    opacity: 1,
    visibility: "visible",
  },
  "&:hover a, &:focus a": {
    color: theme.palette.primary.main,
  },
  "& a": {
    textDecoration: "none",
    wordBreak: "break-all",
    color: theme.palette.text.primary,
  },
  "& .material-icons": {
    display: "block",
  },
}));

const getIconByName = (iconName: string) => {
  switch (iconName) {
    case "person":
      return <AiOutlineUser />;
    case "phone":
      return <BiPhone />;
    case "email":
      return <AiOutlineMail />;
    case "error":
      return <BiErrorCircle />;
    case "thumb":
      return <FiThumbsUp />;
    case "public":
      return <MdPublic />;
    default:
      return <AiOutlineUser />;
  }
};

const AboutItem = ({ item }: { item: AbutData }) => {
  const getLinkAddress = () => {
    switch (item.linkType) {
      case "link": {
        return <a href={item.text}>{item.text}</a>;
      }
      case "phone": {
        return <a href={`tel:${item.text}`}>{item.text}</a>;
      }
      case "email": {
        return <a href={`mailto:${item.text}`}>{item.text}</a>;
      }
      default:
        return <Box component="p">{item.text}</Box>;
    }
  };

  return (
    <AboutItemRoot>
      <Box component="span" sx={{ mr: 3.5, fontSize: 20 }}>
        {getIconByName(item.icon)}
      </Box>
      {getLinkAddress()}
      <Box component="span" ml="auto" mr={-2} mt={-2}>
        <IconButton
          sx={{
            color: "primary.main",
            padding: 2,
            opacity: 0,
            visibility: "hidden",
            "& .MuiSvgIcon-root": {
              fontSize: 20,
            },
          }}
          size="large"
        >
          <EditOutlinedIcon />
        </IconButton>
      </Box>
    </AboutItemRoot>
  );
};

interface AboutProps {
  about: AbutData[];
}

const About = (props: AboutProps) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      title={messages["wall.about"]}
      action={messages["wall.editPageInfo"]}
    >
      <AppList
        animation="transition.slideRightBigIn"
        data={props.about}
        renderRow={(data: AbutData, index: number) => (
          <AboutItem key={index} item={data} />
        )}
      />
    </AppCard>
  );
};

export default About;
