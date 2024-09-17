export const getNodeColor = (label: string) => {
  switch (label) {
    case 'User':
      return '#16a34a'
    case 'System':
      return '#d97706'
    case 'Emmployee':
      return '#0891b2'
    case 'History':
      return '#e11d48'
    case 'Location':
      return '#2563eb'
    case 'Facility':
      return '#c026d3'
    default:
      return '#d97706'
  }
}
