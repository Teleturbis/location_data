function App() {
  return <div></div>;
}

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