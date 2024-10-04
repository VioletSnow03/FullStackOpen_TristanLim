const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  handleNameChange,
  newNumber,
  setNewNumber,
  handleNumberChange,
  addName,
}) => {
  return (
    <form
      className="flex flex-col aspect-square items-center gap-4 p-12 border border-slate-200 my-16 rounded-lg shadow-md"
      onSubmit={addName}
    >
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-300 hover:bg-blue-600 transition-colors"
        >
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
