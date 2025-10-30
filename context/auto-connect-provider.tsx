"use client";

import { useLocalStorage } from "@solana/wallet-adapter-react";
import { createContext, useContext, ReactNode } from "react";

export interface AutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect: (autoConnect: boolean) => void;
}

// Buat context yang bisa undefined agar aman
const AutoConnectContext = createContext<AutoConnectContextState | undefined>(undefined);

export function useAutoConnect(): AutoConnectContextState {
  const context = useContext(AutoConnectContext);
  if (!context) {
    throw new Error("useAutoConnect must be used within an AutoConnectProvider");
  }
  return context;
}

export function AutoConnectProvider({ children }: { children: ReactNode }) {
  const [autoConnect, setAutoConnect] = useLocalStorage("autoConnect", true);

  return (
    <AutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
      {children}
    </AutoConnectContext.Provider>
  );
}