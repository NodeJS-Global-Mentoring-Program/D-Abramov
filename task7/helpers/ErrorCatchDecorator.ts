import { ErrorCatchDecoratorLogger } from '../helpers/Loggers';

export function ErrorCatchDecorator(OriginalClass: any) {
   const methods: Array<{
       name: string,
       method: (args: any) => any
    }> = Object.keys(OriginalClass).map((name: string) => ({
       name,
       method: OriginalClass[name]
    }));

   methods.forEach(v => {
      OriginalClass[v.name] = async (args: any) => {
         try {
            const data = await v.method(args);
            return data;
         } catch (e) {
            ErrorCatchDecoratorLogger.error([e, OriginalClass, v.name, args]);
            throw e;
         }
      };
   });

   return OriginalClass;
}

