import type { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'

import { ImageIcon } from '../SvgIcons'

interface Props {
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
}

const ImagePlaceHolder = ({ getRootProps, getInputProps }: Props) => (
  <label
    htmlFor="file-upload"
    {...getRootProps()}
    className="mt-1 w-full items-center flex cursor-pointer justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
  >
    <div className="space-y-1 text-center">
      <div className=" text-sm text-gray-600 dark:text-gray-200">
        <ImageIcon />
        <div className="relative  rounded-md bg-white dark:bg-gray-800 font-medium text-primary-500">
          <span>Upload a image</span>
          <input {...getInputProps()} name="image" className="sr-only" />
        </div>
      </div>
      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
    </div>
  </label>
)

export default ImagePlaceHolder
