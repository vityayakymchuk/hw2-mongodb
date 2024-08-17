import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/constans.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export function setupServer() {

const app = express();
const PORT = Number(env('PORT', '3000'));

app.use(cookieParser());

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
app.use(cors());

app.use(router);

app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());

app.use('*', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

};
