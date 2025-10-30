"use client";

import { create } from "zustand";
import { produce } from "immer";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  type: NotificationType;
  message: string;
  description?: string;
  txid?: string;
}

interface NotificationStore {
  notifications: Notification[];
  set: (fn: (state: NotificationStore) => void) => void;
  clear: () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  set: (fn) => set(produce(fn)),
  clear: () => set({ notifications: [] }),
}));

export default useNotificationStore;