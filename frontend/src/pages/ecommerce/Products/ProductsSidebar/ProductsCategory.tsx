import React from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Fonts } from "../../../../shared/constants/AppEnums";

const ProductsCategory = () => {
  return (
    <TreeView
      style={{
        flexGrow: 1,
        maxWidth: 400,
        fontWeight: Fonts.REGULAR,
      }}
      defaultExpanded={["1"]}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Watches">
        <TreeItem nodeId="2" label="Men's Watches" />
        <TreeItem nodeId="3" label="Women's Watches" />
        <TreeItem nodeId="4" label="Kid's Watches" />
      </TreeItem>
    </TreeView>
  );
};

export default ProductsCategory;
