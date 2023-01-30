import { SystemEditModeProps } from 'types/system'

import Card from './Card'

const Description = ({ data, editMode }: SystemEditModeProps) => {
  const { description } = data
  const { isEditMode, register } = editMode
  return (
    <>
      <b>Description</b>
      <Card>
        {isEditMode ? <textarea rows="8" className="w-full" {...register('description')} /> : <p>{description}</p>}
      </Card>
    </>
  )
}

export default Description
