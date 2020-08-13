import { USER_LIST, User } from './';
export let store = USER_LIST;

export const createUser = (payload: User) => {
   store.push(payload);
};


export const getUserbyId = (
   id: string
) => store.find((user: User) => user.id === id);

export const deleteUserbyId = (
   id: string
) => (store = store.map((user: User) => {
   if (user.id === id) {
      user.isDeleted = true;
   }

   return user;
}));

export const updateUserById = (
   id: string,
   payload: User
) => (store = store.map((user: User) => {
   if (user.id === id) {
      user = { ...user, ...payload };
   }

   return user;
}));

export const getAutoSuggestUsers = (
   substring: string,
   limit: number
) => store
   .sort()
   .filter((user: User) => user.login.includes(substring))
   .slice(0, limit);
