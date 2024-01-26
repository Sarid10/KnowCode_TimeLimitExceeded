import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { EVaultProvider } from "./context/context";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <EVaultProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </EVaultProvider>
);
