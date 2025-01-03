import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const router = Router();
// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
// Remove the unused __dirname declaration
// const __dirname = path.dirname(__filename);
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);
// Serve index.html for all other routes
router.get('*', (_req, res) => {
    res.sendFile(path.resolve(path.dirname(__filename), '../../client/dist/index.html'));
});
export default router;
