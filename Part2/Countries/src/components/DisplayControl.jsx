import ListofCountries from "./ListofCountries";
import DetailedCountry from "./DetailedCountry";

const DisplayControl = ({
  toDisplay,
  filteredCountries,
  countryData,
  weatherData,
  showCountryofID,
}) => {
  if (toDisplay == "country") {
    return (
      <DetailedCountry countryData={countryData} weatherData={weatherData} />
    );
  }
  if (toDisplay == "list") {
    return (
      <ListofCountries
        filteredCountries={filteredCountries}
        showCountryofID={showCountryofID}
      />
    );
  }
  if (toDisplay == "prompt") {
    return <div>narrow your search</div>;
  }
};

export default DisplayControl;
