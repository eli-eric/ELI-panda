import React from "react";
import { useDispatch } from "react-redux";
import { onUpdateSelectedMail } from "../../../../../redux/actions";
import Box from "@mui/material/Box";
import MessageItem from "./MessageItem";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import AppTooltip from "../../../../../@crema/core/AppTooltip";
import { MailObj, Message } from "types/models/apps/Mail";

interface MailDetailBodyProps {
  selectedMail: MailObj;
}

const MailDetailBody: React.FC<MailDetailBodyProps> = ({ selectedMail }) => {
  const dispatch = useDispatch();

  const onSubmitMail = (message: Message, index: number) => {
    let messages = selectedMail.messages;
    messages!.splice(index + 1, 0, message);
    selectedMail.messages = messages;
    dispatch(onUpdateSelectedMail(selectedMail));
  };

  const onChangeStarred = (message: Message, isStarred: boolean) => {
    message.isStarred = isStarred;
    selectedMail.messages = selectedMail.messages!.map((data) =>
      data.messageId === message.messageId ? message : data
    );
    dispatch(onUpdateSelectedMail(selectedMail));
  };
  return (
    <Box sx={{ px: 5, py: 1 }}>
      {selectedMail ? (
        <>
          <Box
            sx={{
              pt: 1,
              pb: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: { xs: 16, sm: 18 },
                marginRight: 3,
                paddingLeft: { xs: 0, sm: 12.5 },
              }}
            >
              {selectedMail.subject}
            </Box>
            <AppTooltip title={selectedMail.label.name}>
              <span
                style={{
                  color: selectedMail.label.color,
                  height: 22,
                  cursor: "pointer",
                }}
              >
                <LabelOutlinedIcon />
              </span>
            </AppTooltip>
          </Box>
          {selectedMail.messages!.map((message, index) => (
            <MessageItem
              key={index}
              index={index}
              mailLength={selectedMail.messages!.length}
              message={message}
              onSubmitMail={onSubmitMail}
              onChangeStarred={onChangeStarred}
            />
          ))}
        </>
      ) : null}
    </Box>
  );
};

export default MailDetailBody;
