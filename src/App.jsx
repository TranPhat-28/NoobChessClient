// import { Chessboard } from "react-chessboard";
import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

function App() {
    const user = "A";

    return (
        <Routes>
            {/* This Route required user to login */}
            <Route
                path="/"
                element={
                    user ? <RootLayout /> : <Navigate to={"/login"} replace />
                }
            >
                <Route index element={<div>Home</div>} />
            </Route>

            <Route
                path="/login"
                element={
                    user ? <Navigate to={"/"} replace /> : <div>Login</div>
                }
            />

            <Route path="*" element={<div>Not found</div>} />
        </Routes>
    );
}

export default App;
