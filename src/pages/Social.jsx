import GameRoomListItem from "../components/GameRoomListItem";

const Social = () => {
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

    const mockMessageList = [
        "Message A",
        "Message B",
        "Message C",
        "Message D",
        "Message E",
        "Message F",
        "Message G",
        "Message H",
        "Message I",
        "Message C",
        "Message D",
        "Message E",
        "Message F",
        "Message G",
        "Message H",
        "Message I",
    ];

    return (
        <div className="h-full w-full p-4 gap-4 lg:gap-6 flex flex-col lg:flex-row items-center justify-center overflow-hidden">
            <div className="h-1/2 lg:h-3/5 w-full max-w-2xl flex flex-col">
                <h2 className="text-2xl font-bold">Game Rooms</h2>
                <div className="bg-base-200 h-full p-2 flex flex-col gap-2 overflow-y-scroll">
                    {mockRoomList.map((room, index) => (
                        <GameRoomListItem key={index} name={room} />
                    ))}
                </div>
            </div>

            <div className="h-1/2 lg:h-3/5 w-full max-w-2xl flex flex-col">
                <h2 className="text-2xl font-bold">Global Chat</h2>
                <div className="bg-base-200 h-full p-2 flex flex-col gap-2 overflow-y-scroll">
                    {mockMessageList.map((message, index) => (
                        <p key={index}>User: {message}</p>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Aa..."
                    className="input input-bordered w-full"
                />
            </div>
        </div>
    );
};

export default Social;
