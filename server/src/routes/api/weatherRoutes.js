import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const historyService = new HistoryService();
// POST Request with city name to retrieve weather data
router.post('/weather', async (req, res) => {
    const { city } = req.body;
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }
    try {
        const weatherData = await WeatherService.getWeatherForCity(city);
        await historyService.addCity(city);
        return res.json(weatherData);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
});
// GET search history
router.get('/history', async (_req, res) => {
    try {
        const history = await historyService.getCities();
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve search history' });
    }
});
// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await historyService.removeCity(id);
        res.status(200).send({ message: 'City removed from history' });
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to remove city from history' });
    }
});
export default router;
