// import { Chessboard } from "react-chessboard";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Pages
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Lobby from "./pages/Lobby";
import Social from "./pages/Social";

function App() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/news" element={<div>News</div>} />
                <Route path="/social" element={<Social />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<div>Not found</div>} />
        </Routes>
    );
}

export default App;
