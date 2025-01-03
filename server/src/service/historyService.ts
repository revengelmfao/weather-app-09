import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file URL
const __filename = fileURLToPath(import.meta.url);

const filePath = path.resolve(path.dirname(__filename), '../../db/searchHistory.json');

// Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

// Complete the HistoryService class
class HistoryService {
  // Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }

  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
  }

  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read();
  }

  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<void> {
    const cities = await this.read();
    const newCity = new City(Date.now().toString(), city);
    cities.push(newCity);
    await this.write(cities);
  }

  // Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default HistoryService;