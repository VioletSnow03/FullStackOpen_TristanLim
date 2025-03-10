import Person from "./Person";

const Persons = ({ persons, newFilter, deletePersonOfId }) => {
  const filteredList = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div className="border border-slate-400 p-2 rounded-md bg-slate-50">
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
