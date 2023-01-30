const Title = ({ data, editMode }) => {
  const { isEditMode, register } = editMode
  return isEditMode ? <input {...register('name')} className="w-full" /> : <h1 className="">{data.name}</h1>
}

export default Title
