interface Props {
  children: React.ReactNode
  title: string
}
const NavigationTitleComponent = ({ children, title }: Props) => {
  return (
    <div className="space-y-1">
      <h3 className="px-3 text-sm font-medium text-gray-500" id="projects-headline">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default NavigationTitleComponent
