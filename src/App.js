import './App.css';
import React, {useState} from 'react';


const api = {
    key: "3a150d6cc914df9486358771d442f4a9",
    base: "http://api.openweathermap.org/data/2.5/"
};

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [flag, setFlag] = useState(false);
    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                    setFlag(true)
                });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        var now=new Date();
    let hours = now.getHours();
    let mins = now.getMinutes();

    let period='AM';
    if(hours>11){
        period="PM";
        if(hours>12) hours = hours-12;
    }
    if(mins<10){
        mins="0"+mins;
    }


        return `${day} | ${date} ${month} ${year} | ${hours}:${mins} ${period} `
    }
 const nameBuilder = ()=>{
    let divname ='Clear sky';
    if(weather.weather){
        if(weather.weather[0].main == 'Clouds'){
            divname='Clouds sky';
        }
        else if(weather.weather[0].main == 'Clear'){
            divname='Clear sky';
        }
        else if(weather.weather[0].main == 'Haze'){
            divname='Haze sky';
        }
        else if(weather.weather[0].main == 'Mist'){
            divname='Mist sky';
        }
        else if(weather.weather[0].main == 'Rain'){
            divname='Rain sky';
        }
    }
    return `${divname}`
 }
   let classn="Clear sky";
   if(flag){
    classn=nameBuilder();
   } 

    return (
        <div className={classn}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search any city"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                            <div className="range">
                            <div className="min-temp">
                               min temp:  {Math.round(weather.main.temp_min)}°c
                            </div>
                            <div className="max-temp">
                               max temp:  {Math.round(weather.main.temp_max)}°c
                            </div>
                            </div>
                        </div>
                        <div className='credit'>
                            Hello everyone!
                            <p>Niteen here, this website shows realtime temperature and weather of any city.</p>
                            <p> It fetches required data from API and reflect it on your screen.</p>
                            <p> I have used React, HTML,CSS javascript and Node.JS to complete this project.
                            </p>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    );
}
export default App