// import { Chessboard } from "react-chessboard";
import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Friends from "./pages/Friends";
import Social from "./pages/Social";

function App() {
    const user = "A";

    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/social" element={<Social />} />
                <Route path="/news" element={<div>News</div>} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<div>Not found</div>} />
        </Routes>
    );
}

export default App;
