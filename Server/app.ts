import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import mainRouter from './route/mainRouter';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social API',
      version: '1.0.0',
      description: 'A simple Social network',
    },
    servers: [
      {
        url: 'http://localhost:3100',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./route/*.ts'],
};

const specs = swaggerJsDoc(options);

const app: express.Application = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/', mainRouter);

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://god:root@cluster0.llh3w.mongodb.net/myDataBase?retryWrites=true&w=majority'
    );
    app.listen(3100, () => {
      console.log('started');
    });
  } catch (error) {
    process.exit(1);
  }
}

start();
