import "./global.css";
import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
            setSuccessMessage(`Changed the number of ${returnedPerson.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
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
        console.log(returnedRemoval);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-100">
      <h2 className="font-semibold text-3xl py-8 text-fuchsia-950">
        Phonebook
      </h2>
      <Notification
        message={successMessage}
        className={
          "font-bold px-4 py-2 bg-green-100 border-green-500 border-2 rounded-lg"
        }
      />
      <Notification
        message={errorMessage}
        className={
          "font-bold px-4 py-2 bg-red-100 border-red-500 border-2 rounded-lg"
        }
      />
      <div className="flex space-x-9">
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
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-600">Numbers</h3>
          <Filter
            newFilter={newFilter}
            handleFilterChange={handleFilterChange}
          />
          <Persons
            persons={persons}
            newFilter={newFilter}
            deletePersonOfId={deletePersonOfId}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
