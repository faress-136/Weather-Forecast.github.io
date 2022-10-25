let searchInput = document.getElementById("searchInput")
let finalRes
let location_name = document.getElementById("location")
let firstDay = document.getElementById("firstDay")
let next_Day = document.getElementById("nextDay")
let last_Day = document.getElementById("lastDay")


searchInput.addEventListener('keyup', function(){
    let searchText = searchInput.value
    forecastWeather(searchText)
})

let days_array = [
 "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

let months_array = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
   ]
   


async function forecastWeather(country){
   let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b06cf363aab84bf89b205346222210&q=${country}&days=3`)
   if(res.status != 400){
    finalRes  = await res.json()
    console.log(finalRes.current)
    displayToday(finalRes.location, finalRes.current)
    console.log(finalRes.forecast.forecastday)
    NextDay(finalRes.forecast.forecastday)
    LastDay(finalRes.forecast.forecastday)
   }
   else{
    console.log("wrong name");
   }
}


function displayToday(loc, current){
    let date = new Date(current.last_updated)
    var cartona =`<div class="weather-header d-flex align-items-center justify-content-between rounded-3">
    <div class="day">${days_array[date.getDay()]}</div>
    <div class="date">${date.getDate()} ${months_array[date.getMonth()]}</div>
  </div>

  <div class="weather-details p-3 py-5">
    <div id="location" class="location">${loc.name}</div>
    <div class="degree d-flex flex-column align-items-center justify-content-center d-md-flex flex-md-row justify-content-align-content-md-between ">
        <div class="temp">
            ${current.temp_c}<sup>o</sup>C
        </div>
        <div class="icon-weather ms-0">
            <img width="90" src="https:${current.condition.icon}" alt="">
        </div>
    </div>
    <div class="information mb-4">${current.condition.text}</div>
    <span class="me-5"><img class="me-1" src="weather_img/icon-umberella.png" alt="">20%</span>
    <span class="me-5"><img class="me-1" src="weather_img/icon-wind.png" alt="">18km/h</span>
    <span class="me-5"><img class="me-1" src="weather_img/icon-compass.png" alt="">East</span>

  </div>`

  firstDay.innerHTML = cartona

}

function NextDay(weather_forecast){
    let cartona = ""
    let i =1
    let date = new Date(weather_forecast[i].date)
    cartona +=`
    <div class="weather-header d-flex align-items-center justify-content-center">
      <div class="day">${days_array[date.getDay()]}</div>
    </div>
    <div class="weather-content">
    <div class="icon-weather d-flex justify-content-center align-items-center">
        <img width="48" src="https:${weather_forecast[i].day.condition.icon}" alt="">
    </div>
    <div class="p-3">
      <div class="degree d-flex align-items-center justify-content-center">
              ${weather_forecast[i].day.maxtemp_c}<sup>o</sup>C
      </div>
      <div class="under-text d-flex justify-content-center align-items-center">${weather_forecast[i].day.mintemp_c}<sup>o</sup></div>
      
      <div class="information d-flex justify-content-center align-items-center">${weather_forecast[i].day.condition.text}</div>

    </div>
    </div>
 `
next_Day.innerHTML = cartona
}

function LastDay(weather_forecast_2){
    let cartona = ""
    let i = 2
    let date = new Date(weather_forecast_2[i].date)
    cartona +=` <div class="weather-header d-flex align-items-center justify-content-center">
    <div class="day">${days_array[date.getDay()]}</div>
  </div>
  <div class="weather-content">
  <div class="icon-weather d-flex justify-content-center align-items-center">
      <img width="48" src="https:${weather_forecast_2[i].day.condition.icon}" alt="">
  </div>
  <div class="p-3">
    <div class="degree d-flex align-items-center justify-content-center">
    ${weather_forecast_2[i].day.maxtemp_c}<sup>o</sup>C
    </div>
    <div class="under-text d-flex justify-content-center align-items-center">${weather_forecast_2[i].day.mintemp_c}<sup>o</sup></div>
    
    <div class="information d-flex justify-content-center align-items-center">${weather_forecast_2[i].day.condition.text}</div>

  </div>
  </div>` 
last_Day.innerHTML = cartona

}


forecastWeather("Cairo")