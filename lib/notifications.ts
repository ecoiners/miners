"use client";

import useNotificationStore from "./useNotificationStore";

export function notify(newNotification: {
  type?: "success" | "error" | "info" | "warning";
  message: string;
  description?: string;
  txid?: string;
}) {
  const { notifications, set } = useNotificationStore.getState();

  set((state) => {
    state.notifications = [
      ...notifications,
      { type: "success", ...newNotification },
    ];
  });
}