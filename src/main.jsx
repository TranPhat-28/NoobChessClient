import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import LoadingModal from "./components/LoadingModal.jsx";

// axios.defaults.baseURL = "http://localhost:5038/";
axios.defaults.baseURL = "https://noob-chess-server.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider
            clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
        >
            <Provider store={store}>
                <React.Suspense fallback={<MoonLoader />}>
                    <BrowserRouter>
                        <App />
                        <LoadingModal />
                        <ToastContainer theme="colored" autoClose={1000} />
                    </BrowserRouter>
                </React.Suspense>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
