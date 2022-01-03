import React from "react";
import { TextField } from "@mui/material";
import AppCard from "@crema/core/AppCard";
import CalendarWrapper from "./CalendarWrapper";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

interface DateSelectorProps {}

const DateSelector: React.FC<DateSelectorProps> = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <AppCard sxStyle={{ height: 1 }} contentStyle={{ padding: 0 }}>
      <CalendarWrapper>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={value}
          onChange={(newValue: Date | null) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </CalendarWrapper>
    </AppCard>
  );
};

export default DateSelector;
