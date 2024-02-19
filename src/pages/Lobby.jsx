import { PiHandFistBold, PiRobotBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import GameRoomListItem from "../components/GameRoomListItem";
import SPGameCreateModal from "../components/SPGameCreateModal";
import useGameCreation from "../hooks/GameCreation";

const Lobby = () => {
    // Redux
    const user = useSelector((state) => state.userAuth.user);

    // Game Creation Hooks
    const { CreateSinglePlayerGameAuth } = useGameCreation();

    // Handle SP Onclick
    const handleSPOnclick = () => {
        if (user == null) {
            document.getElementById("spGameCreateModal").showModal();
        } else {
            CreateSinglePlayerGameAuth();
        }
    };

    const mockRoomList = [
        "Room A",
        "Room B",
        "Room C",
        "Room D",
        "Room E",
        "Room F",
        "Room G",
        "Room H",
        "Room I",
        "Room E",
        "Room F",
        "Room G",
        "Room H",
        "Room I",
    ];

    return (
        <div className="h-full w-full p-4 gap-4 lg:gap-6 flex flex-col lg:flex-row items-center lg:justify-center overflow-hidden">
            <div className="h-3/5 w-full max-w-2xl flex flex-col">
                <h2 className="text-2xl font-bold">Game Rooms</h2>
                <div className="bg-base-200 h-full p-2 flex flex-col gap-2 overflow-y-scroll">
                    {mockRoomList.map((room, index) => (
                        <GameRoomListItem key={index} name={room} />
                    ))}
                </div>
            </div>

            <div className="h-1/4 lg:h-3/5 w-full max-w-2xl flex flex-col">
                <h2 className="text-2xl font-bold">Start a game</h2>
                <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-4 lg:p-4">
                    <button
                        className="btn btn-secondary text-lg h-full p-1 sm:p-6"
                        onClick={handleSPOnclick}
                    >
                        <div className="flex items-center gap-4">
                            <PiRobotBold className="text-6xl" />
                            <p>Play against AI bot</p>
                        </div>
                    </button>
                    <button className="btn btn-secondary text-lg h-full p-1 sm:p-6">
                        <div className="flex items-center gap-4">
                            <PiHandFistBold className="text-6xl" />
                            <p>Create a MP room</p>
                        </div>
                    </button>
                </div>
            </div>

            <SPGameCreateModal />
        </div>
    );
};

export default Lobby;
