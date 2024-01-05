import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { MoonLoader } from "react-spinners";

// axios.defaults.baseURL = "http";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <React.Suspense fallback={<MoonLoader />}>
            <BrowserRouter>
                <App />
                <ToastContainer theme="colored" autoClose={1000} />
            </BrowserRouter>
        </React.Suspense>
    </React.StrictMode>
);