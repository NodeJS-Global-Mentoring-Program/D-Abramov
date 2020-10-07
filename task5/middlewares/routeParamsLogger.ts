export const routeParamsLogger = (req: any, res: any, next: any) => {
   const { method, url: service, body } = req;

   console.log({
      method,
      service,
      body
   });

   return next();
};
