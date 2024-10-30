// Example useAuth.js
import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
      setUser({ username });
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = (username) => {
    sessionStorage.setItem("username", username);
    setIsLoggedIn(true);
    setUser({ username });
  };

  const logout = () => {
    sessionStorage.removeItem("username");
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, login, logout };
}
