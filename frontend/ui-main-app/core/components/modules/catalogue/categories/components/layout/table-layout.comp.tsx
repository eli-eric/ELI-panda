interface Props {
  children: React.ReactNode
}

const TableLayoutComponent = ({ children }: Props) => {
  return <div className="h-full overflow-auto border-t border-gray-300  ">{children}</div>
}

export default TableLayoutComponent
