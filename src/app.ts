import express from 'express';

import { orderRoute, productRoute, userRoute, rootRoute } from './routes/exporter';

const app = express();

app.use(express.json());

app.get('/', rootRoute);

app.use('/products', productRoute);

app.use('/orders', orderRoute);

app.use('/login', userRoute);

export default app;
