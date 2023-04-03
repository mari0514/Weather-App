import { useState } from 'react';
import React from 'react'
import axios from 'axios';
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '@chakra-ui/button'
import { Search2Icon } from '@chakra-ui/icons'
// import { AddIcon } from '@chakra-ui/icons'
import { FaTemperatureLow } from 'react-icons/fa';

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [temp, setTemp] = useState(0);
    const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);
    const [isCelsius, setIsCelsius] = useState(false);

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            const API_KEY = 'a25a4a7a74fb4e72c2cf473d6566964f';
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`;

            axios.get(URL)
            .then((response) => {
                setData(response.data);
                setTemp(response.data.main.temp);
                setFeelsLikeTemp(response.data.main.feels_like);
                setIsCelsius(false);
                console.log(response.data);
            })
        }
    }

    // Celsius & Fahrenheit converter
    const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius);
        if (isCelsius) {
            // converting Celsius to Fahrenheit
            setTemp((temp * 1.8) + 32);
            setFeelsLikeTemp((feelsLikeTemp * 1.8) + 32);
        } else {
            // converting Fahrenheit to Celcius
            setTemp((temp - 32) / 1.8);
            setFeelsLikeTemp((feelsLikeTemp - 32) / 1.8);
        }
    }


    return (
        <div className="app">
            <div className="search">
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/> */}
                <Search2Icon className="searchIcon" />
                <input 
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Enter Location"
                    type="text" />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        {data.name
                            ? <p>{data.name}</p>
                            : null}
                    </div>
                    <div className="temp">
                        {data.main
                            ? <h1>{temp.toFixed()} {isCelsius ? '°C' : '°F'}</h1>
                            : <h1>Check Weather</h1>}
                    </div>
                    <div className="description">
                        {data.weather
                            ? <p>{data.weather[0].description}</p>
                            : null}
                        {data.main
                        ? <Button
                            // leftIcon={<AddIcon />}
                            leftIcon={<FaTemperatureLow />}
                            className="converter"
                            onClick={toggleTemperatureUnit}
                            colorScheme='teal'
                            size='lg'>
                                {isCelsius ? 'in °F' : 'in °C'}
                            </Button>
                        : null}
                    </div>
                </div>
                {data.name != undefined &&
                    <div className="bottom">
                        {data.main
                            ? <div className="feels">
                                <p>Feels Like</p>
                                <p className="bold">
                                    {feelsLikeTemp.toFixed()} {isCelsius ? '°C' : '°F'}
                                </p>
                            </div>
                            : null}
                        {data.main
                            ? <div className="humidity">
                                <p>Humidity</p>
                                <p className="bold">
                                    {data.main.humidity}%
                                </p>                    
                            </div>
                            : null}
                        {data.wind
                            ? <div className="wind">
                                <p>Wind Speed</p>
                                <p className="bold">
                                    {data.wind.speed.toFixed()}MPH
                                </p>
                            </div>
                            : null}
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
