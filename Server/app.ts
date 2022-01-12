import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: express.Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
