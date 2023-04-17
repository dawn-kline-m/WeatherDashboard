

//function getApi() {
    // event listener
fetch("http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=4d1c0a79f5410788bbe883c406a19675")
    .then(response => response.json())
    .then(citiesFound => {
        
        console.log(citiesFound);
        let firstCity = citiesFound[0];
        console.log(firstCity)
        console.log(firstCity.lat);
        console.log(firstCity.lon);
        //let latEl = firstCity.lat;
        //let latEl = firstCity.lon'

        return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=4d1c0a79f5410788bbe883c406a19675`)


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

  

//     .then(response => response.json())
//     .then(data => {
       
//         console.log(data);
        
//     })
// }

// fetchButton.addEventListener('click', getApi);







