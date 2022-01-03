import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MailContentHeader from "./MailContentHeader";
import {
  onGetMailList,
  onUpdateStarredStatus,
} from "../../../../redux/actions";
import { Hidden } from "@mui/material";
import AppsPagination from "@crema/core/AppsPagination";
import AppsContent from "@crema/core/AppsContainer/AppsContent";
import AppsHeader from "@crema/core/AppsContainer/AppsHeader";
import AppsFooter from "@crema/core/AppsContainer/AppsFooter";
import AppList from "@crema/core/AppList";
import ListEmptyResult from "@crema/core/AppList/ListEmptyResult";
import EmailListSkeleton from "@crema/core/AppSkeleton/EmailListSkeleton";
import MailListItemMobile from "./MailListItemMobile";
import MailListItem from "./MailListItem";
import { AppState } from "../../../../redux/store";
import { LabelObj, MailObj } from "../../../../types/models/apps/Mail";

interface MailsListProps {}

const MailsList: React.FC<MailsListProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { folder, label }: { folder: string; label: string } = useParams();

  const [filterText, onSetFilterText] = useState("");

  const {
    mailList,
    totalMails,
  }: {
    mailList: MailObj[];
    labelList: LabelObj[];
    totalMails: number;
  } = useSelector<AppState, AppState["mailApp"]>(({ mailApp }) => mailApp);

  const [page, setPage] = useState(0);

  const { pathname } = useLocation();

  const path = pathname.split("/");

  const { loading } = useSelector<AppState, AppState["common"]>(
    ({ common }) => common
  );

  useEffect(() => {
    setPage(0);
  }, [pathname]);

  useEffect(() => {
    setPage(0);
    if (folder) {
      dispatch(onGetMailList("folder", folder, page));
    }
    if (label) {
      dispatch(onGetMailList("label", label, page));
    }
  }, [dispatch, folder, label, page]);

  const [checkedMails, setCheckedMails] = useState<number[]>([]);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    setPage(value);
  };

  const onChangeCheckedMails = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedMails(checkedMails.concat(id));
    } else {
      setCheckedMails(checkedMails.filter((mailId) => mailId !== id));
    }
  };

  const onViewMailDetail = (mail: MailObj) => {
    if (label) history.push(`/apps/mail/label/${label}/${mail.id}`);
    if (folder) history.push(`/apps/mail/${folder}/${mail.id}`);
  };

  const onChangeStarred = (checked: boolean, mail: MailObj) => {
    dispatch(onUpdateStarredStatus([mail.id], checked, path[path.length - 1]));
  };
  const onGetFilteredMails = () => {
    if (filterText === "") {
      return mailList;
    } else {
      return mailList.filter((mail) =>
        mail.subject.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  };

  const list = onGetFilteredMails();
  return (
    <>
      <AppsHeader>
        <MailContentHeader
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
          onPageChange={onPageChange}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          page={page}
          path={path}
        />
      </AppsHeader>
      <AppsContent>
        <Hidden smDown>
          <AppList
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
            data={list}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderRow={(mail) => (
              <MailListItem
                key={mail.id}
                mail={mail}
                // labelList={labelList}
                onChangeCheckedMails={onChangeCheckedMails}
                checkedMails={checkedMails}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
              />
            )}
          />
        </Hidden>
        <Hidden smUp>
          <AppList
            sx={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
            data={list}
            ListEmptyComponent={
              <ListEmptyResult
                loading={loading}
                placeholder={<EmailListSkeleton />}
              />
            }
            renderRow={(mail) => (
              <MailListItemMobile
                key={mail.id}
                mail={mail}
                // labelList={labelList}
                checkedMails={checkedMails}
                onChangeCheckedMails={onChangeCheckedMails}
                onViewMailDetail={onViewMailDetail}
                onChangeStarred={onChangeStarred}
              />
            )}
          />
        </Hidden>
      </AppsContent>
      <Hidden smUp>
        {list.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={totalMails}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  );
};

export default MailsList;
