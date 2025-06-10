import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import loginRoutes from './routes/login.routes';
import morgan from 'morgan';

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/', loginRoutes);
app.use('/api/users', userRoutes);

export default app;
