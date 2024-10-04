import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DisplayControl from "./components/DisplayControl";

const filterList = (countries, filterCountry) => {
  const filteredList = countries.filter((country) =>
    country.name.toLowerCase().includes(filterCountry.toLowerCase())
  );
  return filteredList;
};

const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY;

  const [filterCountry, setFilterCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [display, setDisplay] = useState("");

  const allCountries = useRef([]);
  const filteredCountries = filterList(allCountries.current, filterCountry);

  const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const getAllCountryNames = () => {
    return axios.get(baseURL).then((response) => response.data);
  };

  useEffect(() => {
    console.log("getting list of all countries");
    getAllCountryNames().then((rawData) => {
      const countryNames = rawData.map((data) => ({
        name: data.name.common,
        id: data.name.common,
      }));
      allCountries.current.push(...countryNames);
      console.log(allCountries.current[0]?.name || "");
    });
  }, []);

  useEffect(() => {
    if (filteredCountries.length > 10) {
      setDisplay("prompt");
      console.log("set to prompt");
    }
    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      setDisplay("list");
      console.log("set to list");
    }
    if (filteredCountries.length == 1) {
      console.log("set to country");
      const countryName = filteredCountries[0].name;
      showCountryofID(countryName);
    }
  }, [filterCountry]);

  const handleFilterCountryChange = (event) => {
    setFilterCountry(event.target.value);
  };

  const showCountryofID = (id) => {
    console.log(`show ${id}`);
    const countryURL = `https://studies.cs.helsinki.fi/restcountries/api/name/${id}`;
    axios.get(countryURL).then((response) => {
      const countryData = response.data;
      setCountryData(countryData);
      setDisplay("country");
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${countryData.latlng[0]}&lon=${countryData.latlng[1]}&appid=${api_key}&units=metric`;
      console.log(weatherURL);
      axios.get(weatherURL).then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
      });
    });
  };

  return (
    <>
      <h1>Countries</h1>
      <div>
        <p>find countries</p>
        <input value={filterCountry} onChange={handleFilterCountryChange} />
      </div>
      <DisplayControl
        toDisplay={display}
        filteredCountries={filteredCountries}
        countryData={countryData}
        weatherData={weatherData}
        showCountryofID={showCountryofID}
      ></DisplayControl>
    </>
  );
};

export default App;
