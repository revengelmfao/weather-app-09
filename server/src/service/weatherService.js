import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
// Define a class for the Weather object
class Weather {
    constructor(temperature, description, icon) {
        this.temperature = temperature;
        this.description = description;
        this.icon = icon;
    }
}
// Complete the WeatherService class
class WeatherService {
    constructor(cityName) {
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.apiKey = '69efba7374d15403d87de86fb440dc43';
        this.cityName = cityName;
    }
    // Create fetchLocationData method
    async fetchLocationData(query) {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
        return response.json();
    }
    // Create destructureLocationData method
    destructureLocationData(locationData) {
        const { lat, lon } = locationData[0];
        return { lat, lon };
    }
    // Create buildGeocodeQuery method
    buildGeocodeQuery() {
        return `${this.cityName}`;
    }
    // Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
    }
    // Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
        return this.destructureLocationData(locationData);
    }
    // Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const response = await fetch(this.buildWeatherQuery(coordinates));
        return response.json();
    }
    // Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const { main, weather } = response;
        return new Weather(main.temp, weather[0].description, weather[0].icon);
    }
    // Complete getWeatherForCity method
    async getWeatherForCity(city) {
        this.cityName = city;
        const coordinates = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(coordinates);
        return this.parseCurrentWeather(weatherData);
    }
}
export default new WeatherService('');
