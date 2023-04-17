
let locateCity = "London"
//function getApi() {
    // event listener

    //geo end point, acquires name of the city and get the lat/long, lat and long will be used with other API
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locateCity}&limit=5&appid=4d1c0a79f5410788bbe883c406a19675`)
    .then(response => response.json())
    .then(citiesFound => {
        
        console.log(citiesFound);
        console.log(locateCity)
        let firstCity = citiesFound[0];
        let latEl = firstCity.lat;
        let lonEl = firstCity.lon;
        console.log(firstCity)
        console.log(firstCity.lat);
        console.log(firstCity.lon);
       

        // this fetch request is based on prior query
        // this is the 5-day weather forecast that acquires the lat/long data and gets the forecast
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=4d1c0a79f5410788bbe883c406a19675`)
        
         console.log
        for (let i = 0; i < data.results.length; i++) {


            let titleEl = document.createElement("p")
            titleEl.textContent = data.results[i].title;

            document.body.appendChild(titleEl);


            let urlEl = document.createElement("a");
            urlEl.textContent = data.results[i].url;
            urlEl.href = data.results[i].url;

            document.body.appendChild(titleEl);
            document.body.appendChild(urlEl);

        }





    })
// focus on grabbing data and storing it to local storage, then user interface
  

//     .then(response => response.json())
//     .then(data => {
       
//         console.log(data);
        
//     })
// }

// fetchButton.addEventListener('click', getApi);







