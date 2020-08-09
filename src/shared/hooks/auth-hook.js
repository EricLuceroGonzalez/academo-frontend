import { useCallback, useState, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  // Add new STATE (logged id or not)
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState(false);

  const login = useCallback((uName, uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUserName(uName);
    const tokenExpirationTime =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationTime);
    // Storing session auth data:
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userName: uName,
        userId: uid,
        token: token,
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {    
    if (token && tokenExpirationDate) {
      // Calculate the remaining time:
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // Check localStorage for token
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userName,
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { userName, token, login, logout, userId };
};
