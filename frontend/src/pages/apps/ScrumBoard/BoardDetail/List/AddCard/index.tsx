import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  onAddNewCard,
  onDeleteSelectedCard,
  onEditCardDetails,
} from "../../../../../../redux/actions";
import AppConfirmDialog from "@crema/core/AppConfirmDialog";
import IntlMessages from "@crema/utility/IntlMessages";
import CardHeader from "./CardHeader";
import AddCardForm from "./AddCardForm";
import { useAuthUser } from "../../../../../../@crema/utility/AuthHooks";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import { BoardObj, CardListObj, CardObj } from "types/models/apps/ScrumbBoard";

interface AddCardProps {
  isAddCardOpen: boolean;
  onCloseAddCard: () => void;
  board: BoardObj;
  list: CardListObj;
  selectedCard: CardObj | null;
}

const AddCard: React.FC<AddCardProps> = ({
  isAddCardOpen,
  onCloseAddCard,
  board,
  list,
  selectedCard,
}) => {
  const dispatch = useDispatch();

  const { user } = useAuthUser();
  console.log("selectedCard: ", selectedCard);
  const [checkedList, setCheckedList] = useState(() =>
    selectedCard ? selectedCard.checkedList : []
  );

  const { messages } = useIntl();
  const validationSchema = yup.object({
    title: yup
      .string()
      .required(messages["validation.titleRequired"] as string),
  });

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedMembers, setMembersList] = useState(() =>
    selectedCard ? selectedCard.members : []
  );

  const [selectedLabels, setSelectedLabels] = useState(() =>
    selectedCard ? selectedCard.label : []
  );

  const [comments, setComments] = useState(() =>
    selectedCard ? selectedCard.comments : []
  );

  const [attachments, setAttachments] = useState(() =>
    selectedCard ? selectedCard.attachments : []
  );

  const onAddAttachments = (files: any) => {
    setAttachments([...attachments, ...files]);
  };

  useEffect(() => {
    if (selectedCard) {
      setCheckedList(selectedCard ? selectedCard.checkedList : []);
      setMembersList(selectedCard ? selectedCard.members : []);
      setSelectedLabels(selectedCard ? selectedCard.label : []);
      setComments(selectedCard ? selectedCard.comments : []);
      setAttachments(selectedCard ? selectedCard.attachments : []);
    }
  }, [selectedCard]);

  const onDeleteCard = () => {
    const boardId = board.id;
    const listId = list.id;
    const cardId = selectedCard!.id;
    dispatch(onDeleteSelectedCard(boardId, listId, cardId));
    setDeleteDialogOpen(false);
    onCloseAddCard();
  };

  const onClickDeleteIcon = () => {
    if (selectedCard) {
      setDeleteDialogOpen(true);
    } else {
      onCloseAddCard();
    }
  };

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { xs: 320, sm: 400, md: 600, lg: 900 },
          boxSizing: "border-box",
        },
      }}
      anchor="right"
      open={isAddCardOpen}
      onClose={onCloseAddCard}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          title: selectedCard ? selectedCard.title : "",
          desc: selectedCard && selectedCard.desc ? selectedCard.desc : "",
          label: selectedCard && selectedCard.label ? selectedCard.label : [],
          members:
            selectedCard && selectedCard.members ? selectedCard.members : [],
          date: selectedCard && selectedCard.date ? selectedCard.date : null,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedCard) {
            const editedCard = {
              ...selectedCard,
              comments: comments,
              ...data,
              attachments: attachments,
              members: selectedMembers,
              label: selectedLabels,
              checkedList: checkedList.filter((item) => item.title !== ""),
            };
            dispatch(onEditCardDetails(board, list, editedCard));
          } else {
            const newCard = {
              id: Math.floor(Math.random() * 1000),
              attachments: attachments,
              checkedList: [],
              comments: comments,
              ...data,
              label: selectedLabels,
              members: selectedMembers,
            };
            dispatch(onAddNewCard(board, list, newCard));
          }
          onCloseAddCard();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <>
            <CardHeader
              onAddAttachments={onAddAttachments}
              onClickDeleteIcon={onClickDeleteIcon}
              onCloseAddCard={onCloseAddCard}
            />
            <Box
              sx={{
                height: "calc(100% - 60px)",
              }}
            >
              <AddCardForm
                values={values}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                board={board}
                list={list}
                checkedList={checkedList}
                onCloseAddCard={onCloseAddCard}
                setCheckedList={setCheckedList}
                comments={comments}
                setComments={setComments}
                authUser={user}
                attachments={attachments}
                setAttachments={setAttachments}
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
                selectedMembers={selectedMembers}
                setMembersList={setMembersList}
                selectedCard={selectedCard}
              />
            </Box>
          </>
        )}
      </Formik>

      {isDeleteDialogOpen ? (
        <AppConfirmDialog
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteCard}
          title={<IntlMessages id="scrumboard.deleteCard" />}
          dialogTitle={<IntlMessages id="common.deleteItem" />}
        />
      ) : null}
    </Drawer>
  );
};

export default AddCard;
