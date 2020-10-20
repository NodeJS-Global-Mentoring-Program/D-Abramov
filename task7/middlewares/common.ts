import { routeParamsLogger } from './routeParamsLogger';
import { authorizationCheck } from './authorizationCheck';

export const commonMiddlewares = [
   routeParamsLogger,
   authorizationCheck
];
