
let locateCity = "London"

// event listener
function getApi(locateCity) {


    //geo end point, acquires name of the city and get the lat/long, lat and long will be used with other API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locateCity}&units=imperial&appid=4d1c0a79f5410788bbe883c406a19675`)
        .then(response => response.json())
        .then(cityData => {

            console.log(cityData);
            // console.log(locateCity)
            // let firstCity = citiesFound[0];
            let latEl = cityData.coord.lat;
            let lonEl = cityData.coord.lon;
            // console.log(firstCity)
            // console.log(firstCity.lat);
            // console.log(firstCity.lon);
            document.querySelector("#cityName").textContent = `City: ${cityData.name}`
            document.querySelector("#cityTemp").textContent = `Temp: ${cityData.main.temp} F`
            document.querySelector("#cityDate").textContent = `Date: ${new Date(cityData.dt * 1000).toLocaleDateString()}`
            document.querySelector("#cityHumidity").textContent = `Humidity: ${cityData.main.humidity} %`
            document.querySelector("#cityWind").textContent = `Wind: ${cityData.wind.speed} MPH`
            // this fetch request is based on prior query
            // this is the 5-day weather forecast that acquires the lat/long data and gets the forecast
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latEl}&lon=${lonEl}&appid=4d1c0a79f5410788bbe883c406a19675`)

        })

        .then(response => response.json())
        .then(forecastData => {

            console.log(forecastData);
            //add forecast cards here
        })
}
let fetchButton = document.querySelector("#search")

// event is what user does, and will refresh the page 
fetchButton.addEventListener('submit', function (event) {

    //stops the default refresh
    event.preventDefault();
    let newCity = document.querySelector("#city-name").value
    console.log(newCity)

    // trigger functions, no quote for variable
    getApi(newCity)
});






