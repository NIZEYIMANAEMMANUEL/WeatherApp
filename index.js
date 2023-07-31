const apiKey = 'YOUR_WEATHERAPI_API_KEY';
const form = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const locationDisplay = document.getElementById('location');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();

  if (location === '') {
    alert('Please enter a location');
    return;
  }

  getWeatherData(location)
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again later.');
    });
});

async function getWeatherData(location) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return data;
}

function displayWeatherData(data) {
  locationDisplay.textContent = `Location: ${data.location.name}, ${data.location.country}`;
  temperatureDisplay.textContent = `Temperature: ${data.current.temp_c}°C`;
  descriptionDisplay.textContent = `Weather Description: ${data.current.condition.text}`;

  weatherInfo.classList.remove('hidden');
}
