const Title = ({ data, isEditMode, register }) => {
  return (
    <div className="flex grow">
      {isEditMode ? (
        <input placeholder="Title" {...register('name')} className="text-2xl grow" />
      ) : (
        <h1 className="text-2xl">{data.name}</h1>
      )}
    </div>
  )
}

export default Title
