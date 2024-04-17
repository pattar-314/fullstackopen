import { useEffect, useState } from "react";
import './../main.css'
import axios from "axios";
const weatherApiKey = import.meta.env['VITE_WEATHER_API_KEY']

const SingleCountry = ({ countryInfo }) => {
  const [langList, setLangList] = useState([]);
  const [temp, setTemp] = useState(null)

  const fetchWeather = async () => {
    const apiString = `https://api.openweathermap.org/data/3.0/onecall?lat=${countryInfo.capitalInfo.latlng[0]}&lon=${countryInfo.capitalInfo.latlng[1]}&exclude=hourly,daily,minutely,alerts&appid=${weatherApiKey}&units=metric`
    console.log('apiString: ', apiString)
    const apiRequest = await axios.get(apiString)
    const temp = apiRequest.data.current.temp
    console.log(`temperature ${temp} Celcius`)
    setTemp(temp)
  }


  const proccessLangList = () => {
    let ll = [];
    for (let index of Object.keys(countryInfo.languages)) {
      ll = ll.concat(countryInfo.languages[index])
    }
    setLangList(ll.map((lang) => <li key={lang}>{lang}</li>))
    fetchWeather()
  }

  useEffect(() => {
    proccessLangList();
  }, []);

  return (
    <div className="single-country-wrapper">
      <h1 className="country-name">{countryInfo.name.official}</h1>
      <div>
        <div>capital: {countryInfo.capital[0]}</div>
        <div>area: {countryInfo.area}</div>
        <div className="lang-list">
          <h3>
            <b>languages:</b>
          </h3>
          <ul>{langList}</ul>
      </div>
      <div className="country-flag">{countryInfo.flag}</div>
    </div>
    <div className="country-weather">
      <h2>Weather in {countryInfo.capital[0]}</h2>
        {temp ? <p>{`temperature ${temp} Celcius`}</p> : null}
    </div>

        </div>

  );
};

export default SingleCountry;
