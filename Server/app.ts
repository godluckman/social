import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import mainRouter from './route/mainRouter';

const app: express.Application = express();

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
