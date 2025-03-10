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
      className="flex flex-col items-center gap-4 p-12 border border-slate-400 rounded-lg bg-slate-50"
      onSubmit={addName}
    >
      <div className="text-slate-600 font-semibold">
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div className="text-slate-600 font-semibold">
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button
          type="submit"
          className="px-8 py-2 rounded-md bg-indigo-600 text-slate-100 hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
