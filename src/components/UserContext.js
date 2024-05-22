import React, { createContext, useContext, useState } from 'react';

// Create context
const UserContext = createContext();

// Export provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUsername = (username) => {
    setUser({ ...user, username });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, setUser, setUsername, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
