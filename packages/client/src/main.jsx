import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import App from "./App";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>
);
