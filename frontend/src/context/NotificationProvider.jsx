import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {

  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
  setNotifications((prev) => {

    const alreadyExists = prev.some(
      (notification) => notification.message === message
    );

    if (alreadyExists) {
      return prev;
    }

    const newNotification = {
      id: Date.now(),
      message,
      type,
    };

    return [
      newNotification,
      ...prev
    ];
  });
};

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;