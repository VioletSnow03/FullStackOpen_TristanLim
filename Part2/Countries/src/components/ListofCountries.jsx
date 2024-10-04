import CountryListItem from "./CountryListItem";

const ListofCountries = ({ filteredCountries, showCountryofID }) => {
  return (
    <div>
      {filteredCountries.map((country) => (
        <CountryListItem
          key={country.name}
          name={country.name}
          showCountry={() => showCountryofID(country.name)}
        ></CountryListItem>
      ))}
    </div>
  );
};

export default ListofCountries;
