import express from 'express';
import { weatherRouter } from './routes/weather';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { rateLimiter } from './middleware/rateLimiter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(rateLimiter);

app.get('/', (req, res) => {
  res.send('Weather Service is healthy');
});

app.use('/weather', weatherRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Weather Service listening on port ${PORT}`);
});
