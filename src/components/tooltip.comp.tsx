import ReactTooltip, { Offset } from 'react-tooltip'

interface TooltipComponentProps {
  children: any
  text: any
  offset?: Offset | undefined
}

const TooltipComponent = ({ children, text, offset }: TooltipComponentProps) => (
  <div>
    <div className="flex items-center ">
      <div data-for="custom-class" data-tip={text}>
        {children}
      </div>
    </div>
    <ReactTooltip id="custom-class" className="w-64" effect="solid" offset={offset} />
  </div>
)

export default TooltipComponent
