import express from 'express';

import { order, product, user } from './routes/exporter';

const app = express();

app.use(express.json());

app.use('/products', product);

app.use('/orders', order);

app.use('/login', user);

export default app;
