export const mReq = (options: any) => {
   const req = {
      ...options
   };
   return req;
};

export const mRes = () => {
   const res: any = {};
   res.status = jest.fn().mockReturnValue(res);
   res.json = jest.fn().mockReturnValue(res);
   return res;
};

export const mNext = () => jest.fn();
