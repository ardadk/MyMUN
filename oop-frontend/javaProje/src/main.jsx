// src/main.jsx (Vite örneği)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// İsterseniz global CSS dosyanızı import edin:
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
