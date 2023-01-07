import React from "react";
import ReactDOM from "react-dom/client";
import { UserIdProvider } from "./userIdContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserIdProvider>
      <App />
    </UserIdProvider>
  </React.StrictMode>
);
