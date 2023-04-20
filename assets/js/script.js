
let locateCity = "London"
let searchHistory = JSON.parse(localStorage.getItem('forecast')) || []

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
            searchHistory.push(cityData.name)
            localStorage.setItem("forecast", JSON.stringify(searchHistory))

            //add button for city

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
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latEl}&lon=${lonEl}&appid=4d1c0a79f5410788bbe883c406a19675&units=imperial`)

        })

        .then(response => response.json())
        .then(forecastData => {

            console.log(forecastData.list);
            //add forecast cards here
            for (let i = 0; i < forecastData.list.length; i++) {
                const element = forecastData.list[i];
                if (element.dt_txt.includes("12:00:00")) {
                    let column = document.createElement("div")
                    column.setAttribute("class", "col")
                    let card = document.createElement("div")
                    card.setAttribute("class", "card")
                    let cardbody = document.createElement("div")
                    cardbody.setAttribute("class", "card-body")
                    let cardtitle = document.createElement("h5")
                    cardtitle.setAttribute("class", "card-title")
                    cardtitle.textContent = element.dt_txt.split(" ")[0]
                    let cardtext = document.createElement("p")
                    cardtext.setAttribute("class", "card-text")
                    cardtext.textContent = element.main.temp

                    cardbody.append(cardtitle, cardtext)
                    card.append(cardbody)
                    column.append(card)
                    document.querySelector(".forecast").append(column)
                }
            }
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






