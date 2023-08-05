import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"; // You might need to install this package

interface SessionContextType {
  sessionId: string | null;
  fetch: (url: string, options?: RequestInit) => Promise<Response>;
  setSessionId: (sessionId: string, duration: number) => void;
  removeSessionId: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setLocalSessionId] = useState<string | null>(null);

  const fetchWithSession = useCallback(async (url: string, options: RequestInit = {}) => {
    const headers = sessionId === null ? options.headers : {
      ...options.headers,
      session: sessionId,
    };
    const response = await fetch(url, { ...options, headers });
    return response;
  }, [sessionId]);

  const removeSessionId = useCallback(() => {
	Cookies.remove("sessionId");
	setLocalSessionId(null);
  }, []);

  const setSessionId = useCallback((newSessionId: string, duration: number) => {
    Cookies.set("sessionId", newSessionId, { expires: duration });
    setLocalSessionId(newSessionId);
  }, []);

  useEffect(() => {
    const cookieSessionId = Cookies.get("sessionId");
    if (cookieSessionId && cookieSessionId !== sessionId) {
      setLocalSessionId(cookieSessionId);
    }
  }, [sessionId]);

  const contextValue: SessionContextType = {
    sessionId,
    fetch: fetchWithSession,
    setSessionId,
	removeSessionId,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
