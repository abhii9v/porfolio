'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  isChatOpen: boolean;
  setChatOpen: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setChatOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isChatOpen,
        setChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
