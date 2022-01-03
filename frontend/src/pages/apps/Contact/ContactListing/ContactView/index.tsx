import ContactListItem from "./ContactListItem";
import Box from "@mui/material/Box";
import ContactGridItem from "./ContactGridItem";
import React from "react";
import { useSelector } from "react-redux";
import AppList from "@crema/core/AppList";
import AppGrid from "@crema/core/AppGrid";
import ListEmptyResult from "@crema/core/AppList/ListEmptyResult";
import IntlMessages from "@crema/utility/IntlMessages";
import ContactListSkeleton from "@crema/core/AppSkeleton/ContactListSkeleton";
import { Hidden } from "@mui/material";
import ContactListItemMobile from "./ContactListItem/ContactListItemMobile";
import { AppState } from "../../../../../redux/store";
import { ContactObj } from "types/models/apps/Contact";

interface ContactViewContentProps {
  list: ContactObj[];
  pageView: string;
  loading: boolean;
  handleAddContactOpen: () => void;
  onChangeStarred: (isStarred: boolean, contact: ContactObj) => void;
  onChangeCheckedContacts: (event: any, id: number) => void;
  checkedContacts: number[];
  onSelectContactsForDelete: (contactIds: number[]) => void;
  onOpenEditContact: (contact: ContactObj) => void;
  onViewContactDetail: (contact: ContactObj) => void;
}

const ContactView: React.FC<ContactViewContentProps> = ({
  list,
  pageView,
  loading,
  handleAddContactOpen,
  onChangeStarred,
  onChangeCheckedContacts,
  checkedContacts,
  onSelectContactsForDelete,
  onOpenEditContact,
  onViewContactDetail,
}) => {
  const { labelList } = useSelector<AppState, AppState["contactApp"]>(
    ({ contactApp }) => contactApp
  );

  return (
    <>
      {pageView === "list" ? (
        <>
          <Hidden smDown>
            <AppList
              data={list}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle={<IntlMessages id="contactApp.createContact" />}
                  onClick={handleAddContactOpen}
                  placeholder={<ContactListSkeleton />}
                />
              }
              renderRow={(contact) => (
                <ContactListItem
                  key={contact.id}
                  contact={contact}
                  labelList={labelList}
                  onChangeCheckedContacts={onChangeCheckedContacts}
                  checkedContacts={checkedContacts}
                  onSelectContactsForDelete={onSelectContactsForDelete}
                  onChangeStarred={onChangeStarred}
                  onViewContactDetail={onViewContactDetail}
                  onOpenEditContact={onOpenEditContact}
                />
              )}
            />
          </Hidden>

          <Hidden smUp>
            <AppList
              data={list}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle={<IntlMessages id="contactApp.createContact" />}
                  onClick={handleAddContactOpen}
                  placeholder={<ContactListSkeleton />}
                />
              }
              renderRow={(contact) => (
                <ContactListItemMobile
                  key={contact.id}
                  contact={contact}
                  checkedContacts={checkedContacts}
                  labelList={labelList}
                  onChangeStarred={onChangeStarred}
                  onViewContactDetail={onViewContactDetail}
                  onOpenEditContact={onOpenEditContact}
                />
              )}
            />
          </Hidden>
        </>
      ) : (
        <Box
          sx={{
            px: 5,
            pt: 0.5,
            pb: 3,
          }}
        >
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 2,
              xl: 3,
            }}
            data={list}
            renderRow={(contact) => (
              <ContactGridItem
                key={contact.id}
                contact={contact}
                labelList={labelList}
                onChangeCheckedContacts={onChangeCheckedContacts}
                checkedContacts={checkedContacts}
                onChangeStarred={onChangeStarred}
                onSelectContactsForDelete={onSelectContactsForDelete}
                onViewContactDetail={onViewContactDetail}
                onOpenEditContact={onOpenEditContact}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default ContactView;
