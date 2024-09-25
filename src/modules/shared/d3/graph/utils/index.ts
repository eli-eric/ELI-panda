export const getNodeColor = (label: string) => {
  // Different color for every label
  switch (label) {
    case 'CatalogueCategory':
      return '#FF5733' // Bright Orange
    case 'CatalogueCategoryProperty':
      return '#33FF57' // Bright Green
    case 'CatalogueCategoryPropertyGroup':
      return '#3357FF' // Bright Blue
    case 'CatalogueCategoryPropertyType':
      return '#FF33A8' // Bright Pink
    case 'CatalogueItem':
      return '#FFC300' // Bright Yellow
    case 'CatalogueItemDeleted':
      return '#DAF7A6' // Light Green
    case 'ContactPersonRole':
      return '#C70039' // Dark Red
    case 'Employee':
      return '#900C3F' // Dark Purple
    case 'Facility':
      return '#581845' // Deep Purple
    case 'FileLink':
      return '#FF6F61' // Coral
    case 'HallContactPerson':
      return '#6B5B95' // Indigo
    case 'History':
      return '#88B04B' // Olive Green
    case 'Item':
      return '#F7CAC9' // Pale Pink
    case 'ItemCondition':
      return '#92A8D1' // Light Blue
    case 'ItemUsage':
      return '#955251' // Mauve
    case 'Location':
      return '#B565A7' // Purple
    case 'Manufacturer':
      return '#009B77' // Teal
    case 'Order':
      return '#DD4124' // Red
    case 'OrderStatus':
      return '#D65076' // Raspberry
    case 'PbsData':
      return '#45B8AC' // Aqua
    case 'Role':
      return '#EFC050' // Gold
    case 'RoomCard':
      return '#5B5EA6' // Royal Blue
    case 'SchemaMigration':
      return '#9B2335' // Crimson
    case 'Supplier':
      return '#DFCFBE' // Beige
    case 'System':
      return '#d97706' // Original Amber
    case 'SystemAttribute':
      return '#C3447A' // Fuchsia
    case 'SystemCriticality':
      return '#98B4D4' // Light Lavender
    case 'SystemImportance':
      return '#6C4F3D' // Brown
    case 'SystemType':
      return '#F4A7B9' // Light Pink
    case 'SystemTypeGroup':
      return '#DE7A22' // Orange
    case 'Team':
      return '#20948B' // Turquoise
    case 'Unit':
      return '#A2B9BC' // Grayish Blue
    case 'User':
      return '#16a34a' // Original Green
    case 'UserSettings':
      return '#034F84' // Dark Blue
    case 'Zone':
      return '#ED9121' // Carrot Orange
    default:
      return '#6b7280' // Gray for undefined labels
  }
}

export function getLinkMetrics(d: any, links: any[]) {
  const totalLinks = links.filter(
    l =>
      (l.source === d.source && l.target === d.target) ||
      (l.source === d.target && l.target === d.source)
  ).length

  const linkIndex = links
    .filter(
      l =>
        (l.source === d.source && l.target === d.target) ||
        (l.source === d.target && l.target === d.source)
    )
    .indexOf(d)

  const labelOffset =
    totalLinks > 1 ? (linkIndex - (totalLinks - 1) / 2) * 20 : 0

  return { totalLinks, linkIndex, labelOffset }
}
