import { inputsConfigs } from "./inputs";
import { dataDisplayConfigs } from "./dataDisplay";
import { navigationConfigs } from "./navigation";
import { surfaceConfigs } from "./surfaces";
import { feedbackConfigs } from "./feedback";
import { layoutConfigs } from "./layout";
import { utilConfigs } from "./utils";
import { dataGridConfigs } from "./datagrid";
// import { labConfigs } from "./lab";

export const muiComponentConfigs = [
  ...inputsConfigs,
  ...dataDisplayConfigs,
  ...navigationConfigs,
  ...surfaceConfigs,
  ...feedbackConfigs,
  ...layoutConfigs,
  ...utilConfigs,
  ...dataGridConfigs,
  // ...labConfigs,
];
