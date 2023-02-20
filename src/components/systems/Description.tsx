const Description = ({ data, isEditMode, register }) => {
  const { description } = data
  return isEditMode ? (
    <textarea rows="8" className="w-full" {...register('description')} />
  ) : (
    <p className="w-full">{description}</p>
  )
}

export default Description
