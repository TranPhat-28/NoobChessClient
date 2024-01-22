import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MoonLoader } from "react-spinners";
import { GoogleOAuthProvider } from "@react-oauth/google";

axios.defaults.baseURL = "http://localhost:5038/";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
            <React.Suspense fallback={<MoonLoader />}>
                <BrowserRouter>
                    <App />
                    <ToastContainer theme="colored" autoClose={1000} />
                </BrowserRouter>
            </React.Suspense>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
