import React from "react";
import DatePicker from "@mui/lab/DatePicker";
import IntlMessages from "@crema/utility/IntlMessages";
import moment from "moment";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

interface DatePickerProps {
  date: string;
  setDate: (date: string) => void;
}

const AppDatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <Box
      sx={{
        ml: { xs: 0, sm: 5 },
        mt: { xs: 2, sm: 0 },
      }}
    >
      <DatePicker
        label={<IntlMessages id="common.startDate" />}
        value={date}
        renderInput={(params) => <TextField {...params} />}
        onChange={(value) => setDate(moment(value).format("lll"))}
      />
    </Box>
  );
};

export default AppDatePicker;
