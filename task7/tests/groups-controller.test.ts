import * as groupMethods from '../controllers/group-methods';
import {
   mRes,
   mReq,
   mNext
} from './mocks';

describe('Group controller',  () => {
   it('group should successfully created', async () => {
      const req: any = mReq({
         body: {
            name: 'Test Group',
            permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES']
         }
      });
      const res: any = mRes();
      const next = mNext();

      await groupMethods.createGroup(req, res, next);

      const result = res.json.mock.calls[0][0];
      const status = res.status.mock.calls[0][0];

      expect(status).toBe(200);
      expect(result.status).toEqual('success');
   });

   it('get all groups should return status 200', async () => {
      const req: any = mReq({});
      const res: any = mRes();
      const next = mNext();

      await groupMethods.getAllGroups(req, res, next);

      const status = res.status.mock.calls[0][0];

      expect(status).toBe(200);
   });

   it('group should be null if id wasnt passed', async () => {
      const req: any = mReq({ params: { id: null } });
      const res: any = mRes();
      const next = mNext();

      await groupMethods.getGroupById(req, res, next);

      const result = res.json.mock.calls[0][0];

      expect(result).toBe(null);
   });

   it('group should successfully updated', async () => {
      const req: any = mReq({ params: { id: 1 }, body: {} });

      const res: any = mRes();
      const next = mNext();

      await groupMethods.updateGroupById(req, res, next);

      const result = res.json.mock.calls[0][0];
      const status = res.status.mock.calls[0][0];

      expect(status).toBe(200);
      expect(result.status).toEqual('success');
   });

   it('group should throw an error if body wasnt passed', async () => {
      const req: any = mReq({ params: { id: 1 } });
      const res: any = mRes();
      const next = mNext();

      await groupMethods.deleteGroupbyId(req, res, next);

      expect(next).toHaveBeenCalled();
   });
});
