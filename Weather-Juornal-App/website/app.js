// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=f9940fcf2c960a7b3867b2704233f6e8&units=imperial";

// Function to GET Weather Data
const getWeatherData = async (zip) => {
    const response = await fetch(`${baseURL}${zip}${apiKey}`);
    try {
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Function to POST Data to Server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

// Function to Update UI Dynamically
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}°F`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};

// Event Listener for Generate Button
document.getElementById('generate').addEventListener('click', async () => {

    const zip = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    const date = new Date().toLocaleDateString();

    try {
        const weatherData = await getWeatherData(zip);
        if (weatherData && weatherData.main) {
            await postData('/add', {
                temperature: weatherData.main.temp,
                date,
                userResponse,
            });
            updateUI();
        } else {
            alert('Invalid ZIP code or failed to fetch weather data.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
