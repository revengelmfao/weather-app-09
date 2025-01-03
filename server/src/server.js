import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
// Remove the unused __dirname declaration
// const __dirname = path.dirname(__filename);
// Import the routes
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Serve static files of entire client dist folder
app.use(express.static(path.resolve(path.dirname(__filename), '../../client/dist')));
// Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Implement middleware to connect the routes
app.use(routes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));