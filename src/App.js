import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';

function App() {
  const [coordinates, setCoordinate] = useState([50.11552, 8.68417]);
  const [rad, setRadius] = useState(5000);
  const [loaded, setLoaded] = useState(false);
  const [tripAdvisor, setTripAdvisor] = useState(false);
  const [markers, setMarkers] = useState(<></>);
  const [weather, setWeather] = useState(false);
  const [clicked, setClicked] = useState('nichts');

  function fetchWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=cfb001d5f30122e2e6e75c2f4e2c1288`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }

  function fetchTripAdvisor(lat, lon) {
    fetch(
      `https://api.opentripmap.com/0.1/ru/places/radius?radius=${rad}&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b67f8aba5d057015d876971d0da4711da4`
    )
      .then((res) => res.json())
      .then((data) => {
        setTripAdvisor(data.features);
        makeMarker(data.features);
      });
  }

  function success(pos) {
    setCoordinate([pos.coords.latitude, pos.coords.longitude]);
    fetchWeather(pos.coords.latitude, pos.coords.longitude);
    fetchTripAdvisor(pos.coords.latitude, pos.coords.longitude);
    setLoaded(true);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function handleClick() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function makeMarker(data) {
    setMarkers(
      data.map((element) => (
        <Marker
          key={element.id}
          width={35}
          anchor={element.geometry.coordinates.reverse()}
          color="rgb(255,0,0)"
          onClick={() => setClicked(element.properties.name)}
        />
      ))
    );
  }

  return (
    <div>
      <input
        onChange={(e) => setRadius(e.target.value)}
        type="number"
        value={rad}
      />
      <button onClick={() => handleClick()}>Get Position</button>
      {loaded && weather && (
        <div>
          <Map height={500} defaultCenter={coordinates} defaultZoom={13}>
            {markers /*SEHENSWÜRDIGKEITEN*/}
            <Marker
              width={45}
              anchor={coordinates}
              color="rgb(0,0,255)" /*UNSERE POSITION*/
            />
          </Map>
          <h2>Aktuelle Sehenswürdigkeit: {clicked}</h2>
          <h2>Das aktuelle Wetter in {weather.name}: </h2>
          <ul>
            <li>Es ist aktuell {weather.weather[0].description}</li>
            <li>
              Die Temperaturen sind: {weather.main.temp}°C | Maximal Temperatur:{' '}
              {weather.main.temp_max}°C | Minimal Temperatur:{' '}
              {weather.main.temp_min}°C | Gefühlt wie: {weather.main.feels_like}
              °C
            </li>
            <li>
              Die Luftfeuchtigkeit beträgt: {weather.main.humidity}% und der
              Luftdruck: {weather.main.pressure}hPa
            </li>
            <li>
              Die Windsgeschwindigkeit beträgt:{' '}
              {(weather.wind.speed * 3.6).toFixed(2)}km/h
            </li>
            <li>
              Sonnenstunde heute: ca.{' '}
              {((weather.sys.sunset - weather.sys.sunrise) / 60 / 60).toFixed(
                1
              ) + 'h'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

//

export default App;

/*

- Weatherdata: https://api.openweathermap.org/data/2.5/weather?lat=50.11552&lon=8.68417&units=metric&lang=de&appid=cfb001d5f30122e2e6e75c2f4e2c1288

- current position:
      navigator.geolocation.getCurrentPosition(success, error, options);

      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

- openTripMap:
      http://api.opentripmap.com/0.1/ru/places/radius?radius=2000&lon=38.364285&lat=59.855685&apikey=5ae2e3f221c38a28845f05b67f8aba5d057015d876971d0da4711da4

*/

/*

useEffect(() => {suche nach dem suchbegriff}, [suchbegriff])

*/

/*

PigeonMap:

      <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
        <Marker width={50} anchor={[50.879, 4.6997]} />
      </Map>

      center
        Coordinates of the map center in the format [lat, lng]. Use if the component is controlled,
        e.g. you'll be listening to onBoundsChanged and passing a new center when the bounds change.

      zoom
        Current zoom level, e.g. 12, use for controlled components and update when onBoundsChanged give you a new value.

      onBoundsChanged
        When the bounds change, function ({ center, zoom, bounds, initial }). Use this for a controlled component, then set center and zoom when it's called.
        This callback also gets called on the initial mount (when the first bounds become known). In this case the prop initial will be set to true.
        It will be false on all subsequent calls.

      LOOK HERE:
        https://pigeon-maps.js.org/docs/map

*/
