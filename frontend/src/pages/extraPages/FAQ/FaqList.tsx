import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { Fonts } from "../../../shared/constants/AppEnums";
import { GeneralFaq } from "../../../@crema/services/db/extraPages/faqList/general";

interface FaqListProps {
  faqList: GeneralFaq[];
}

const FaqList: React.FC<FaqListProps> = ({ faqList }) => {
  return (
    <Box sx={{ height: "100%" }}>
      {faqList.map((item) => {
        return (
          <Accordion
            key={item.id}
            sx={{
              color: "text.secondary",
              marginBottom: 0.5,
              padding: "10px 20px",

              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              sx={{
                fontWeight: Fonts.MEDIUM,
                color: "text.primary",
                fontSize: 16,
                padding: 0,
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Box>{item.ques}</Box>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0 0 10px" }}>
              <Box>{item.ans}</Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default FaqList;
