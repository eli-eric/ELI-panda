interface Props {
  children: React.ReactNode
}

const TableLayoutComponent = ({ children }: Props) => {
  return (
    <div className="h-full overflow-auto ">
      <div className="border-t border-gray-300">{children}</div>
    </div>
  )
}

export default TableLayoutComponent
