import Joi from 'joi';

export const userValidationSchema = Joi
   .object()
   .keys({
      login: Joi.string().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8}/)
         .message('не менее 8 символов'),
      age: Joi.number().min(4).max(130).required()
   });

export const errorResponse = (schemaErrors: any) => {
   const errors = schemaErrors.map((error: any) => {
      const { path, message } = error;
      return { path, message };
   });

   return {
      status: 'validationError',
      errors
   };
};

export const validationMiddleware = (schema: any) => {
   return (req: any, res: any, next: any) => {
      const { error } = schema.validate(req.body, {
         abortEarly: false,
         allowUnknown: false
      });

      if (error && error.isJoi) {
         res.status(400).json(errorResponse(error.details));
      } else {
         return next();
      }
   };
};
