import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRouter from './routes/users.routes';
import activitiesRouter from './routes/activities.routes';
import inscriptionsRouter from './routes/inscriptions.routes';
import env from './config/env';

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/inscriptions', inscriptionsRouter);
app.get('/api/hello', (req, res) => {
	res.send('Hello World!');
  });

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

export default app;
