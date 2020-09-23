import express from 'express';
import { router } from './controllers';

const PORT = 3000;
export const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
