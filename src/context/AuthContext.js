import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(sessionStorage.getItem('loggedInUser'));

  // Derive isLoggedIn from username
  const isLoggedIn = !!username; // True if username is not null or empty

  return (
    <AuthContext.Provider value={{ username, setUsername, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
