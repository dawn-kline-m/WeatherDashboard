
let locateCity = "London"
let searchHistory = JSON.parse(localStorage.getItem('forecast')) || []

// event listener
function getApi(locateCity) {


    //geo end point, acquires name of the city and get the lat/long, lat and long will be used with other API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locateCity}&units=imperial&appid=4d1c0a79f5410788bbe883c406a19675`)
        .then(response => response.json())
        .then(cityData => {

            console.log(cityData);
            console.log(locateCity)
            // let firstCity = citiesFound[0];
            let latEl = cityData.coord.lat;
            let lonEl = cityData.coord.lon;

            // searching local storage, for duplicate data, so only unique data is kept
            if (!searchHistory.includes(cityData.name)) {

                searchHistory.push(cityData.name)
                localStorage.setItem("forecast", JSON.stringify(searchHistory))
                historyButton(cityData.name)
            }

            // console.log(firstCity)
            // console.log(firstCity.lat);
            // console.log(firstCity.lon);
            document.querySelector("#cityName").textContent = `City: ${cityData.name}`
            document.querySelector("#cityTemp").textContent = `Temp: ${cityData.main.temp} F`
            document.querySelector("#cityDate").textContent = `Date: ${new Date(cityData.dt * 1000).toLocaleDateString()}`
            document.querySelector("#cityHumidity").textContent = `Humidity: ${cityData.main.humidity} %`
            document.querySelector("#cityWind").textContent = `Wind: ${cityData.wind.speed} MPH`
            document.querySelector("#cityIcon").setAttribute("src", `https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`)
            // this fetch request is based on prior query
            // this is the 5-day weather forecast that gets the forecast
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latEl}&lon=${lonEl}&appid=4d1c0a79f5410788bbe883c406a19675&units=imperial`)

        })

        .then(response => response.json())
        .then(forecastData => {

            console.log(forecastData.list);
            // we have access to the data and will loop through to populate the cards
            // inside 'list' is data for eight days, at three hour increments
            document.querySelector(".forecast").innerHTML = ""
            for (let i = 0; i < forecastData.list.length; i++) {
                // element will have all the data 
                const element = forecastData.list[i];
                // pulling data from the 12:00 noon time frame. if the element 'includes' 12:00:00 noon, create an element
                if (element.dt_txt.includes("12:00:00")) {

                    // create a column
                    let column = document.createElement("div")
                    column.setAttribute("class", "col")

                    // create a card
                    let card = document.createElement("div")
                    card.setAttribute("class", "card")

                    // create card body
                    let cardbody = document.createElement("div")
                    cardbody.setAttribute("class", "card-body")

                    // create card title
                    let cardtitle = document.createElement("h5")
                    cardtitle.setAttribute("class", "card-title")
                    cardtitle.textContent = element.dt_txt.split(" ")[0]

                    // create card text
                    let cardtext = document.createElement("p")
                    cardtext.setAttribute("class", "card-text")

                    // temperature
                    cardtext.textContent = element.main.temp + "F"

                    // wind
                    let cardwind = document.createElement("p")
                    cardwind.setAttribute("class", "card-text")
                    cardwind.textContent = element.wind.speed + "MPH"

                    // humidity
                    let cardhumidity = document.createElement("p")
                    cardhumidity.setAttribute("class", "card-text")
                    cardhumidity.textContent = element.main.humidity + "%"

                    // icon
                    let cardIcon = document.createElement("img")
                    cardIcon.setAttribute("src", `https://openweathermap.org/img/wn/${element.weather[0].icon}.png`)

                    //create card body 
                    cardbody.append(cardtitle, cardIcon, cardtext, cardwind, cardhumidity)
                    card.append(cardbody)
                    column.append(card)


                    document.querySelector(".forecast").append(column)
                }
            }
        })
}

function historyButton(city) {
    let button = document.createElement("button")
    button.textContent = city
    button.setAttribute("class", "list-group-item list-group-item-action")
    button.onclick = function () { getApi(city) };
    document.querySelector(".list-group").append(button)
}
// for loop to display each element on the page
for (let i = 0; i < searchHistory.length; i++) {
    const element = searchHistory[i];
    historyButton(element)

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






