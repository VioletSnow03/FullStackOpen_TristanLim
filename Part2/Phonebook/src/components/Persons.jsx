import Person from "./Person";

const Persons = ({ persons, newFilter }) => {
  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  return (
    <div>
      {filteredList.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default Persons;
