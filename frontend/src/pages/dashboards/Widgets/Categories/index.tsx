import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import CategoryItem from "./CategoryItem";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import { AppScrollbar } from "../../../../@crema";
import { CategoriesData } from "types/models/dashboards/Widgets";

const getData = (data: CategoriesData[]) => {
  return data;
};

interface CategoriesProps {
  data: CategoriesData[];
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
  const { messages } = useIntl();
  const category = getData(data);

  const [categoryList, handleList] = useState(category);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: CategoriesData
  ) => {
    category.isChecked = e.target.checked;
    const list = categoryList.map((item) =>
      item.id === category.id ? category : item
    );
    handleList(list);
  };

  return (
    <AppCard
      title={messages["dashboard.categories"]}
      contentStyle={{ px: 0 }}
      action={
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
        />
      }
      sxStyle={{ height: 1 }}
    >
      <AppScrollbar sx={{ maxHeight: 218 }}>
        <List
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            paddingTop: 2,

            "& li": {
              width: "50%",
              padding: "0px 20px",
              "& .MuiListItemIcon-root": {
                minWidth: 0,
              },
            },
          }}
        >
          {categoryList.map((item) => {
            return (
              <CategoryItem
                key={item.id}
                item={item}
                handleChange={handleChange}
              />
            );
          })}
        </List>
      </AppScrollbar>
    </AppCard>
  );
};

export default Categories;
