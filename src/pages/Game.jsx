import { Chessboard } from "react-chessboard";
import InGameProfile from "../components/InGameProfile";

const Game = () => {
    return (
        <div className="h-full w-full bg-base-200 flex items-center justify-center">
            <div className="h-full w-full max-w-lg lg:max-w-6xl max-h-[42rem] flex flex-col lg:flex-row">
                {/* Chessboard container */}
                <div className="bg-base-200 lg:bg-base-300 lg:rounded w-full p-2 lg:max-w-xl self-center">
                    <Chessboard />
                </div>

                {/* Container */}
                <div className="flex-grow overflow-hidden p-3 flex flex-col gap-4 justify-center">
                    {/* Moves history */}
                    <div className="h-full lg:h-1/2 flex flex-col lg:bg-base-300 lg:rounded p-2">
                        <h2 className="text-2xl font-bold">Moves History</h2>
                        <div className="bg-base-300 lg:bg-base-200 rounded h-full p-2 flex flex-col gap-2 overflow-y-scroll">
                            <p>Black: e2e3</p>
                            <p>White: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                            <p>Move: e2e3</p>
                        </div>
                    </div>

                    {/* Player's profiles */}
                    <div className="hidden lg:flex lg:flex-col lg:justify-between lg:h-2/5">
                        <InGameProfile />
                        <InGameProfile />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
