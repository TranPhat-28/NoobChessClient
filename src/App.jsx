import { Chessboard } from "react-chessboard";

function App() {
    return (
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            {/* The board container */}
            <div className="max-w-lg w-full">
                <Chessboard id="BasicBoard" />
            </div>
        </div>
    );
}

export default App;
