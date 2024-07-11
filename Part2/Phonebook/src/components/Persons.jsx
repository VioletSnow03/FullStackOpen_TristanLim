import Person from "./Person";

const Persons = ({ persons, newFilter, deletePersonOfId }) => {
  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  return (
    <div>
      {filteredList.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePersonOfId(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
