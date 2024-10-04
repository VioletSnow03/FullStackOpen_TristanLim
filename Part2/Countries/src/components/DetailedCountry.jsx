const DetailedCountry = ({ countryData, weatherData }) => {
  if (countryData && weatherData) {
    console.log("trying to return detailed country");
    console.log(countryData.name);
    const weatherIconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    console.log(weatherIconURL);

    return (
      <div>
        <h2>{countryData.name.common}</h2>
        <div>capital {countryData.capital[0]}</div>
        <div>area {countryData.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.entries(countryData.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={countryData.flags.png} alt="" />
        <h3>Weather in {countryData.capital[0]}</h3>
        <div>temperature {weatherData.main.temp} Celcius</div>
        <img src={weatherIconURL} alt="" />
        <div>wind {weatherData.wind.speed} m/s</div>
      </div>
    );
  }
  console.log("no countryData");
  return null;
};

export default DetailedCountry;
