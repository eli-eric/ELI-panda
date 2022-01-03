import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { CategoriesData } from "../../../../types/models/dashboards/Widgets";

interface CategoryItemProps {
  item: CategoriesData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    category: CategoriesData
  ) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, handleChange }) => {
  return (
    <ListItem key={item.id} className="item-hover">
      <ListItemIcon>
        <Box
          sx={{
            ml: -2,
          }}
        >
          <Checkbox
            color="primary"
            checked={item.isChecked}
            onChange={(e) => handleChange(e, item)}
          />
        </Box>
      </ListItemIcon>
      <ListItemText
        primary={
          <Box
            component="span"
            sx={{
              color: !item.isChecked ? "text.secondary" : "",
              fontSize: 14,
            }}
          >
            {item.name}
          </Box>
        }
      />
    </ListItem>
  );
};

export default CategoryItem;
