
// DOM Elements
const searchLocationInput = document.getElementById('searchLocationInput');
const errorMassage= document.getElementById('errorMassage');
const searchButton = document.querySelector('.search-button');

// Current Weather elements
const currentDay = document.getElementById('currentDay');
const currentDate = document.getElementById('currentDate');
const currentLocation = document.getElementById('currentLocation');
const currentTemp = document.getElementById('currentTemp');
const currentWeatherIcon = document.getElementById('currentWeatherIcon');
const currentCondition = document.getElementById('currentCondition');
const currentWindSpeed = document.getElementById('currentWindSpeed');
const currentWindDirection = document.getElementById('currentWindDirection');
const currentHumidity = document.getElementById('currentHumidity');

// second  Day  Weather elements
const nextDay1 = document.getElementById('nextDay1');
const nextDay1WeatherIcon = document.getElementById('nextDay1WeatherIcon');
const nextDay1MaxTemp = document.getElementById('nextDay1MaxTemp');
const nextDay1MinTemp = document.getElementById('nextDay1MinTemp');
const nextDay1Condition = document.getElementById('nextDay1Condition');

// third  Day  Weather elements
const nextDay2 = document.getElementById('nextDay2');
const nextDay2WeatherIcon = document.getElementById('nextDay2WeatherIcon');
const nextDay2MaxTemp = document.getElementById('nextDay2MaxTemp');
const nextDay2MinTemp = document.getElementById('nextDay2MinTemp');
const nextDay2Condition = document.getElementById('nextDay2Condition');

// ==================================================================
// Event Listeners
searchButton.addEventListener('click',function () {
    const location = searchLocationInput.value.trim();
    errorMassage.classList.remove('d-none')
    if (location) {
        errorMassage.classList.add('d-none')
        getWeatherData(location);
        searchLocationInput.value=null
    } else {
        // alert("Please enter a location!");
        errorMassage.textContent="Please enter a location"
    }
});

searchLocationInput.addEventListener('keypress',function (event){
    if (event.key === 'Enter') {
        searchButton.click(); // Simulate a click on the search button
    }
});
// ==================================================================
//   function  to get the user's location first.

    async function init() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    await getWeatherData(`${lat},${lon}`);
                },
                (error) => {
                    // console.error('Geolocation error:', error);
                    errorMassage.textContent = "Could not get your location. ";
                    errorMassage.classList.remove('d-none');
                 
                }
            );
        } else {
            errorMassage.textContent = "Geolocation is not supported by your browser.";
            errorMassage.classList.remove('d-none');
         
        }
    }

// =========================
// Fetch Weather Data

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${location}&days=3`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // For debugging
        displayWeatherData(data);
        errorMassage.classList.add('d-none')
    } 
    catch (error) {
        // console.error("Failed to fetch weather data:", error);
            errorMassage.classList.remove('d-none')
         errorMassage.textContent="Could not retrieve weather data for that location. Please try again.";
    }
}
// ==================================================================
// Display Weather Data

function displayWeatherData(data) {
    if (!data || !data.current || !data.forecast || !data.location) {
        console.error("Invalid weather data received:", data);
        alert("Invalid weather data received. Please try again.");
        return;
    }

    // Current Day Data
    const today = new Date(data.forecast.forecastday[0].date);
    currentDay.textContent = today.toLocaleDateString('en-US', { weekday: 'long' });
    currentDate.textContent = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });

    currentLocation.textContent = data.location.name;
    currentTemp.textContent = data.current.temp_c;
    currentWeatherIcon.src = data.current.condition.icon;
    currentWeatherIcon.alt = data.current.condition.text;
    currentCondition.textContent = data.current.condition.text;
    currentWindSpeed.textContent = data.current.wind_kph;
    currentWindDirection.textContent = data.current.wind_dir;
    currentHumidity.textContent = data.current.humidity;

    // second Day Data
    if (data.forecast.forecastday[1]) {
        const nextDay1Data = data.forecast.forecastday[1];
        const nextDay1DateObj = new Date(nextDay1Data.date);
        nextDay1.textContent = nextDay1DateObj.toLocaleDateString('en-US', { weekday: 'long' });
        nextDay1WeatherIcon.src = nextDay1Data.day.condition.icon;
        nextDay1WeatherIcon.alt = nextDay1Data.day.condition.text;
        nextDay1MaxTemp.textContent = nextDay1Data.day.maxtemp_c;
        nextDay1MinTemp.textContent = nextDay1Data.day.mintemp_c;
        nextDay1Condition.textContent = nextDay1Data.day.condition.text;
    }

    // third  Day  Data
    if (data.forecast.forecastday[2]) {
        const nextDay2Data = data.forecast.forecastday[2];
        const nextDay2DateObj = new Date(nextDay2Data.date);
        nextDay2.textContent = nextDay2DateObj.toLocaleDateString('en-US', { weekday: 'long' });
        nextDay2WeatherIcon.src = nextDay2Data.day.condition.icon;
        nextDay2WeatherIcon.alt = nextDay2Data.day.condition.text;
        nextDay2MaxTemp.textContent = nextDay2Data.day.maxtemp_c;
        nextDay2MinTemp.textContent = nextDay2Data.day.mintemp_c;
        nextDay2Condition.textContent = nextDay2Data.day.condition.text;
    }
}
//  function  to get the user's location first.
    init(); 

