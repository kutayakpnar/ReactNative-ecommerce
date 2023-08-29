import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userId, setUserId] = useState();

  const changeUserId=(value)=>{
    return setUserId(value);

  }

  return (
    <UserContext.Provider value={{ userId, setUserId ,changeUserId }}>
      {children}
    </UserContext.Provider>
  );
}
