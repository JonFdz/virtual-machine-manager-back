import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import vmRoutes from '@routes/vm.routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/vms', vmRoutes);

export default app;
