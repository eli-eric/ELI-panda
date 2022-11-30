import ReactTooltip from 'react-tooltip'

const TooltipComponent = ({ children, text }) => {
  return (
    <div>
      <div className="flex items-center ">
        <div data-for="custom-class" data-tip={text}>
          {children}
        </div>
      </div>
      <ReactTooltip id="custom-class" className="w-64" effect="solid" />
    </div>
  )
}

export default TooltipComponent
