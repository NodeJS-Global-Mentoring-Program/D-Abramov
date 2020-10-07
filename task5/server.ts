import express from 'express';
import { router } from './controllers';
import { commonMiddlewares, routeErrorHandler } from './middlewares';
import { UnhandledExceptionsLogger, UnhandledPromiseRejectionLogger } from './helpers/Loggers';

process.on('uncaughtException', (error: Error) => {
   UnhandledExceptionsLogger.error([error.stack, error.message, error.name]);
   return;
});

process.on('unhandledRejection', (error: Error) => {
   UnhandledPromiseRejectionLogger.error([error.stack, error.message, error.name]);
});

const PORT = 3000;
export const app = express();

app.use(express.json());
app.use(commonMiddlewares);
app.use('/api', router);
app.use(routeErrorHandler);

app.listen(PORT, () => {
   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
