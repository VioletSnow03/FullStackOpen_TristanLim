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
  const nameExists = (name) => nameLowerCaseList.includes(name.toLowerCase());

  const nameLowerCaseList = persons.map((person) => person.name.toLowerCase());

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
