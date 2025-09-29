import express, { Request, Response } from 'express';
import cors from 'cors';
import apiRouter from './routes';
import conn from './database/connect';
import errorHandler from './middlewares/errorHandler';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiRouter);

app.use('**', (req: Request, res: Response) => {
	return res.status(404).send('NOT FOUND');
});

app.use(errorHandler);

app.listen(PORT, async () => {
	await conn;
	console.log(`Listening on ${PORT}`);
});
