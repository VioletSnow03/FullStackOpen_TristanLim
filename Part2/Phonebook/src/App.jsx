import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameLowerCaseList = persons.map((person) =>
      person.name.toLowerCase()
    );
    const nameExists = (name) => nameLowerCaseList.includes(name.toLowerCase());

    if (nameExists(newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        console.log(`Replace ${newName}'s number with ${newNumber}`);
        const person = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        const newPersonObject = { ...person, number: newNumber };
        personService
          .changeNumber(newPersonObject.id, newPersonObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === returnedPerson.id ? returnedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const deletePersonOfId = (id) => {
    if (window.confirm(`Delete ${persons.find((p) => p.id === id).name}?`)) {
      console.log(`To delete: Person with id ${id}`);
      personService.remove(id).then((returnedRemoval) => {
        setPersons(
          persons.filter((person) => person.id !== returnedRemoval.id)
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a New</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePersonOfId={deletePersonOfId}
      />
    </div>
  );
};

export default App;
