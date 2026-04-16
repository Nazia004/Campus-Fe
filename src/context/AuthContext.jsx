import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('lastActivity');
    setUser(null);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('lastActivity', Date.now().toString());
    setUser(userData);
  };

  // ── Idle Timeout Logic (1 Hour) ──────────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    const TIMEOUT = 60 * 60 * 1000; // 1 Hour
    const CHECK_INTERVAL = 60 * 1000; // Check every 1 minute

    const updateActivity = () => {
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    const checkInactivity = () => {
      const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
      const now = Date.now();

      if (now - lastActivity > TIMEOUT) {
        console.log('⏰ Session expired due to inactivity.');
        logout();
      }
    };

    // Attach Activity Listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(name => document.addEventListener(name, updateActivity));

    // Start Inactivity Watcher
    const interval = setInterval(checkInactivity, CHECK_INTERVAL);

    // Initial check on mount/refresh
    checkInactivity();

    return () => {
      events.forEach(name => document.removeEventListener(name, updateActivity));
      clearInterval(interval);
    };
  }, [user, logout]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
