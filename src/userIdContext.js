import React, { createContext, useState, useContext } from "react";

const UserIdContext = createContext();

export function UserIdProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  function updateUserId(newUserId) {
    setUserId(newUserId);
    localStorage.setItem("userId", newUserId);
  }

  return (
    <UserIdContext.Provider value={{ userId, setUserId: updateUserId }}>
      {children}
    </UserIdContext.Provider>
  );
}

export function useUserId() {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error("useUserId must be used within a UserIdProvider");
  }
  return context;
}
