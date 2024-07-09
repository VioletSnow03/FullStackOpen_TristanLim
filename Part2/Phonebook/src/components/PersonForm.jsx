const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  handleNameChange,
  newNumber,
  setNewNumber,
  handleNumberChange,
}) => {
  const nameExists = (name) => nameLowerCaseList.includes(name.toLowerCase());

  const nameLowerCaseList = persons.map((person) => person.name.toLowerCase());

  const addName = (event) => {
    event.preventDefault();
    if (nameExists(newName)) {
      window.alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

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
