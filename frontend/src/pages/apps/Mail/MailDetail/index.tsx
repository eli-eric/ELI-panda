import React, { createRef, useEffect } from "react";
import MailDetailHeader from "./MailDetailHeader";
import MailDetailBody from "./MailDetailBody";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetSelectedMail,
  onNullifyMail,
  onUpdateReadStatus,
} from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import AppsContent from "@crema/core/AppsContainer/AppsContent";
import AppsHeader from "@crema/core/AppsContainer/AppsHeader";
import AppAnimate from "@crema/core/AppAnimate";
import { MailDetailSkeleton } from "@crema/core/AppSkeleton/MailDetailSkeleton";
import Box from "@mui/material/Box";
import { AppState } from "../../../../redux/store";

interface MailDetailProps {}

const MailDetail: React.FC<MailDetailProps> = () => {
  const dispatch = useDispatch();
  const contentRef = createRef();

  const { id }: { id: string } = useParams();
  const selectedMail = useSelector<AppState, AppState["mailApp"]>(
    ({ mailApp }) => mailApp
  ).selectedMail;

  useEffect(() => {
    dispatch(onGetSelectedMail(+id));
    return () => {
      onNullifyMail();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedMail && !selectedMail.isRead) {
      dispatch(onUpdateReadStatus([selectedMail.id], true));
    }
  }, [dispatch, selectedMail]);

  if (!selectedMail) {
    return <MailDetailSkeleton />;
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      ref={contentRef}
    >
      <AppsHeader>
        <MailDetailHeader selectedMail={selectedMail} />
      </AppsHeader>
      <AppsContent isDetailView>
        <AppAnimate animatoin="transition.slideUpIn">
          <MailDetailBody selectedMail={selectedMail} />
        </AppAnimate>
      </AppsContent>
    </Box>
  );
};

export default MailDetail;
