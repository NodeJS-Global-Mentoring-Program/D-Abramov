import express from 'express';
import { router } from './controllers';
import { UserService } from './services';
import { withAuthenticate } from './data-access/db-connection';

const PORT = 3000;
export const app = express();

//withAuthenticate(UserService.seedUsers);

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
