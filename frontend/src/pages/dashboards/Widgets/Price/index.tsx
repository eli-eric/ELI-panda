import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import StyledSlider from "./StyledSlider";

function AirbnbThumbComponent(props: any) {
  return (
    <Box component="span" {...props}>
      <Box component="span" className="bar" />
      <Box component="span" className="bar" />
      <Box component="span" className="bar" />
    </Box>
  );
}

const Price: React.FC<{}> = () => {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) setValue(value);
  };

  const { messages } = useIntl();
  return (
    <AppCard title={messages["dashboard.price"]}>
      <Box
        component="p"
        sx={{
          color: "text.secondary",
          fontWeight: Fonts.MEDIUM,
          fontSize: 14,
        }}
      >{`$${value[0]}mi - $${value[1]}mi`}</Box>

      <StyledSlider
        ThumbComponent={AirbnbThumbComponent}
        defaultValue={value}
        onChange={handleChange}
      />
    </AppCard>
  );
};

export default Price;
