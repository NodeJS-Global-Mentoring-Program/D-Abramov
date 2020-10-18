import winston, { transports } from 'winston';
const { format } = winston;
const { combine, label, json } = format;

winston.loggers.add('CommonErrorHandleMiddleware', {
   level: 'error',
   format: combine(
      label({ label: 'CommonErrorHandleMiddleware' }),
      json()
   ),
   defaultMeta: { middleware: 'routeErrorHandler' },
   transports: [
      new transports.Console({
         level: 'error',
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
         )
      })
   ]
});

winston.loggers.add('ErrorCatchDecorator', {
   level: 'error',
   format: combine(
      label({ label: 'service error handler' }),
      json()
   ),
   defaultMeta: { decorator: 'ErrorCatchDecorator' },
   transports: [
      new transports.Console({
         level: 'error',
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
         )
      })
   ]
});

winston.loggers.add('UnhandledExceptions', {
   level: 'error',
   format: combine(
      label({ label: 'UnhandledExceptions' }),
      json()
   ),
   transports: [
      new transports.Console({
         level: 'error',
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
         )
      })
   ]
});

winston.loggers.add('UnhandledPromiseRejection', {
   level: 'error',
   format: combine(
      label({ label: 'UnhandledPromiseRejection' }),
      json()
   ),
   transports: [
      new transports.Console({
         level: 'error',
         format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
         )
      })
   ]
});

export const CommonErrorHandleMiddlewareLogger = winston.loggers.get('CommonErrorHandleMiddleware');
export const ErrorCatchDecoratorLogger = winston.loggers.get('ErrorCatchDecorator');
export const UnhandledPromiseRejectionLogger = winston.loggers.get('UnhandledPromiseRejection');
export const UnhandledExceptionsLogger = winston.loggers.get('UnhandledExceptions');
