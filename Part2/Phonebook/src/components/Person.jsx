const Person = ({ name, number, deletePerson }) => (
  <div className="space-x-8 flex flex-row justify-between font-regular px-4 py-1 border-b border-slate-300 bg-slate-50 hover:bg-blue-50">
    <div className="inline-flex space-x-3 content-center">
      <p className="content-center font-semibold text-stone-600">{name}</p>{" "}
      <p className="content-center">{number}</p>
    </div>
    <button
      onClick={deletePerson}
      className="px-4 py-1 text-red-600 border-slate-400 border bg-white rounded-lg shadow hover:bg-slate-100"
    >
      Delete
    </button>
  </div>
);

export default Person;
