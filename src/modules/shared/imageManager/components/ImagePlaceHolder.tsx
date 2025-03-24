import { cx } from '@/utils'

interface ImagePlaceHolderProps {
  className?: string
}

export const ImagePlaceHolder = ({ className }: ImagePlaceHolderProps) => (
  <div className={cx('flex flex-col rounded-md', className)}>
    <div className="flex rounded-md border border-t-0 border-gray-200">
      <div className="w-full h-[250px] bg-gray-100 animate-pulse" />
    </div>
  </div>
)
