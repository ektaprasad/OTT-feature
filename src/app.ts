import express from 'express';
import bodyParser from 'body-parser';
import myListRoutes from './routes/myListRoutes';

const app = express();

app.use(bodyParser.json());
app.use('/api/mylist', myListRoutes);

export default app;
