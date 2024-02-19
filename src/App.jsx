import { Route, Routes } from "react-router-dom";

// Layouts
import RootLayout from "./layouts/RootLayout";
import GameLayout from "./layouts/GameLayout";

// Pages
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Lobby from "./pages/Lobby";
import Social from "./pages/Social";
import Game from "./pages/Game";
import News from "./pages/News";

function App() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/news" element={<News />} />
                <Route path="/social" element={<Social />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/game" element={<GameLayout />}>
                <Route path=":mode" element={<Game />} />
            </Route>

            <Route path="*" element={<div>Not found</div>} />
        </Routes>
    );
}

export default App;
