import React, { useState } from "react";
import ColorItem from "./ColorItem";
import AppList from "@crema/core/AppList";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import AppScrollbar from "@crema/core/AppScrollbar";
import { ColorsList } from "types/models/dashboards/Widgets";

const getData = (data: ColorsList[]) => {
  return data;
};

interface ColorsProps {
  data: ColorsList[];
}

const Colors: React.FC<ColorsProps> = ({ data }) => {
  const colors = getData(data);

  const [colorsList, handleList] = useState(colors);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    color: ColorsList
  ) => {
    color.isChecked = e.target.checked;
    const list = colorsList.map((item) =>
      item.id === color.id ? color : item
    );
    handleList(list);
  };
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["dashboard.colors"]}
      contentStyle={{ px: 0 }}
    >
      <AppScrollbar
        sx={{
          height: { xs: 362, xl: 316 },
        }}
      >
        <AppList
          data={data}
          renderRow={(item) => {
            return (
              <ColorItem
                key={item.id}
                item={item}
                handleChange={handleChange}
              />
            );
          }}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default Colors;
