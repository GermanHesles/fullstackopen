const PersonForm = ({
    handleSubmit,
    handleChange,
    newName,
    handleChangeNumber,
    newNumber
  }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input type='text' onChange={handleChange} value={newName} />
      </div>
      <div>
        number:
        <input type='tel' onChange={handleChangeNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;