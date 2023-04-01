import { useState } from 'react';
import React from 'react'
import axios from 'axios';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '@chakra-ui/button'

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const API_KEY = 'a25a4a7a74fb4e72c2cf473d6566964f';

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`;

    const searchLocation = (event) => {
        if (event.key === 'Enter') {
            axios.get(URL)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
        }
    }


    return (
        <div className="app">
            <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
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
                            ? <h1>{data.main.temp.toFixed()} °F</h1>
                            : <h1>Search Weather</h1>}
                        {data.main
                            ? <Button 
                                className="converter"
                                onClick={() => console.log(data.main.temp)}
                                colorScheme='telegram'
                                size='lg'>
                                    Convert to °C
                                </Button>
                            : null}
                    </div>
                    <div className="description">
                        {data.weather
                            ? <p>{data.weather[0].description}</p>
                            : null}
                    </div>
                </div>
                {data.name != undefined &&
                    <div className="bottom">
                        {data.main
                            ? <div className="feels">
                                <p>Feels Like</p>
                                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                            </div>
                            : null}
                        {data.main
                            ? <div className="humidity">
                                <p>Humidity</p>
                                <p className="bold">{data.main.humidity}%</p>                    
                            </div>
                            : null}
                        {data.wind
                            ? <div className="wind">
                                <p>Wind Speed</p>
                                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
                            </div>
                            : null}
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
