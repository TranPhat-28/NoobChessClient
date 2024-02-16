import { useSelector } from "react-redux";
import FriendListItem from "../components/FriendListItem";
import { MdSend } from "react-icons/md";

const Social = () => {
    // Redux
    const user = useSelector((state) => state.userAuth.user);

    const mockFriendList = [
        "Friend A",
        "Friend B",
        "Friend C",
        "Friend D",
        "Friend E",
        "Friend F",
        "Friend G",
        "Friend H",
        "Friend I",
        "Friend E",
        "Friend F",
        "Friend G",
        "Friend H",
        "Friend I",
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
                <h2 className="text-2xl font-bold">Your Friends</h2>
                <div className="bg-base-200 h-full p-2 flex flex-col gap-2 overflow-y-scroll">
                    {user ? (
                        mockFriendList.map((friend, index) => (
                            <FriendListItem key={index} name={friend} />
                        ))
                    ) : (
                        <p>Login to connect with your friends</p>
                    )}
                </div>
            </div>

            <div className="h-1/2 lg:h-3/5 w-full max-w-2xl flex flex-col">
                <h2 className="text-2xl font-bold">Global Chat</h2>
                <div className="bg-base-200 h-full p-2 flex flex-col gap-2 overflow-y-scroll">
                    {mockMessageList.map((message, index) => (
                        <p key={index}>User: {message}</p>
                    ))}
                </div>
                <div className="w-full flex border">
                    <input
                        disabled={!user}
                        type="text"
                        placeholder={user ? "Aa..." : "Login to join the chat"}
                        className="input input-bordered w-full"
                    />
                    {user && (
                        <button className="btn btn-primary">
                            <MdSend />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Social;
