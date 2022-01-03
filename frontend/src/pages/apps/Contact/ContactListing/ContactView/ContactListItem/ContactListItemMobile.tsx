import React from "react";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import clsx from "clsx";
import AppsStarredIcon from "@crema/core/AppsStarredIcon";
import { Fonts } from "shared/constants/AppEnums";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { blue } from "@mui/material/colors";
import { ContactObj, LabelObj } from "types/models/apps/Contact";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";

const ContactListItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    paddingLeft: 20,
    alignItems: "flex-start",
    "& .contactViewLeft": {
      alignItems: "flex-start",
    },
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    },
  };
});

interface ContactListItemProps {
  contact: ContactObj;
  labelList: LabelObj[];
  onChangeStarred: (isStarred: boolean, contact: ContactObj) => void;
  onChangeCheckedContacts?: (event: any, id: number) => void;
  checkedContacts: number[];
  onSelectContactsForDelete?: (contactIds: number[]) => void;
  onOpenEditContact: (contact: ContactObj) => void;
  onViewContactDetail: (contact: ContactObj) => void;

  [x: string]: any;
}

const ContactListItemMobile: React.FC<ContactListItemProps> = ({
  contact,
  checkedContacts,
  onChangeStarred,
  labelList,
  onViewContactDetail,
}) => {
  const onGetLabelColor = (labelId: number) => {
    if (labelId) {
      return (
        labelList.length > 0 &&
        labelList.find((label) => label.id === labelId)!.color
      );
    }
  };

  return (
    <>
      <ContactListItemWrapper
        dense
        key={contact.id}
        className={clsx("item-hover", {
          rootCheck: checkedContacts.includes(contact.id),
        })}
        onClick={() => onViewContactDetail(contact)}
      >
        <Box
          sx={{
            width: { xs: "75%", sm: "80%", md: "50%" },
            display: "flex",
            alignItems: "center",
          }}
          className="contactViewLeft"
        >
          <Box
            sx={{
              mr: 3,
              mt: 1,
            }}
            component="span"
          >
            {contact.image ? (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
                src={contact.image}
              />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
              >
                {contact.name[0].toUpperCase()}
              </Avatar>
            )}
          </Box>
          <Box sx={{ mr: 3, overflow: "hidden" }}>
            <Box
              sx={{
                fontWeight: Fonts.MEDIUM,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              component="p"
            >
              {contact.name}
            </Box>

            <Box
              component="p"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {contact.contact}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: { xs: "25%", sm: "20%", md: "50%" },
          }}
        >
          <span>
            <LabelOutlinedIcon
              style={{ color: `${onGetLabelColor(contact.label)}` }}
              sx={{
                ml: 2,
              }}
            />
          </span>
          <span onClick={(event) => event.stopPropagation()}>
            <AppsStarredIcon item={contact} onChange={onChangeStarred} />
          </span>
        </Box>
      </ContactListItemWrapper>
    </>
  );
};

export default ContactListItemMobile;
