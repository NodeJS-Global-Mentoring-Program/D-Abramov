import * as userMethods from '../controllers/user-methods';
import {
   mRes,
   mReq,
   mNext
} from './mocks';

describe('User controller',  () => {
   it('user suggestion should return an empty array with status 200', async () => {
      const req: any = mReq({ query: { limit: 2, search: 'abcd' } });
      const res: any = mRes();
      const next = mNext();

      await userMethods.getAutoSuggestUser(req, res, next);

      const result = res.json.mock.calls[0][0];
      const status = res.status.mock.calls[0][0];

      expect(status).toBe(200);
      expect(result.status).toEqual('success');
      expect(result.users).toEqual([]);
   });

   it('user suggestion should throw an arror when search is null', async () => {
      const req: any = mReq({ query: { limit: 1, search: null } });
      const res: any = mRes();
      const next = mNext();

      await userMethods.getAutoSuggestUser(req, res, next);

      expect(next).toHaveBeenCalled();
   });

   it('create user should return status 200 & success', async () => {
      const req: any = mReq({
         body: {
            login: 'user144',
            password: 'string144',
            age: '20'
         }
      });
      const res: any = mRes();
      const next = mNext();

      await userMethods.createUser(req, res, next);

      const result = res.json.mock.calls[0][0];
      const status = res.status.mock.calls[0][0];

      expect(status).toBe(200);
      expect(result.status).toEqual('success');
   });

   it('user should be null if id wasnt passed', async () => {
      const req: any = mReq({ params: { id: null } });
      const res: any = mRes();
      const next = mNext();

      await userMethods.getUserById(req, res, next);

      const result = res.json.mock.calls[0][0];

      expect(result).toBe(null);
   });

   it('user should successfully updated', async () => {
      const req: any = mReq({ params: { id: 1 }, body: {
         login: 'user144',
         password: 'string144',
         age: '20'
      } });

      const res: any = mRes();
      const next = mNext();

      await userMethods.updateUser(req, res, next);

      const result = res.json.mock.calls[0][0];
      const status = res.status.mock.calls[0][0];

      expect(status).toBe(200);
      expect(result.status).toEqual('success');
   });

   it('user should successfully deleted', async () => {
      const req: any = mReq({ params: { id: 1 } });
      const res: any = mRes();
      const next = mNext();

      await userMethods.deleteUser(req, res, next);

      const result = res.json.mock.calls[0][0];
      const status = res.status.mock.calls[0][0];

      expect(status).toBe(200);
      expect(result.status).toEqual('success');
   });
});
