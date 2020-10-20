export const compareUserCredentials = (user1: any, user2: {login: string, password: string}) => {
   return Boolean(
      (user1.login === user2.login) && (user1.password === user2.password)
   );
};
