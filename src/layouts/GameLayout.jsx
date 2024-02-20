import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import InGameProfile from "../components/InGameProfile";
import useGameSetup from "../hooks/GameSetup";
import axios from "axios";
import { toast } from "react-toastify";

const GameLayout = () => {
    const { mode } = useParams();
    const navigate = useNavigate();

    // Game info hook
    const { roomInfo, playerInformationSetup, leaveRoomHandler } =
        useGameSetup();

    useEffect(() => {
        playerInformationSetup(mode);

        // Show the loading modal
        document.getElementById("loading_modal").showModal();

        // Request to get backend ready
        axios.get("/api/IsReady").then((response) => {
            if (response.data == "OK") {
                // Close the loading modal
                document.getElementById("loading_modal").close();
            } else {
                // Something went wrong
                navigate("/lobby");
                toast.error("Something went wrong");
            }
        });
    }, []);

    return (
        <div className="drawer h-full w-full">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-bold text-lg">
                        {roomInfo.roomTitle}
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                            <button
                                className="btn btn-outline btn-error"
                                onClick={() => {
                                    leaveRoomHandler(mode);
                                }}
                            >
                                Leave game
                            </button>
                        </ul>
                    </div>
                </div>

                {/* Page content here */}
                <Outlet context={roomInfo} />
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 gap-4">
                    {/* Sidebar content here */}
                    <InGameProfile
                        isBlack={false}
                        name={roomInfo.white.name}
                        value={roomInfo.white.value}
                        description={roomInfo.white.description}
                        img={roomInfo.white.img}
                    />
                    <InGameProfile
                        isBlack={true}
                        name={roomInfo.black.name}
                        value={roomInfo.black.value}
                        description={roomInfo.black.description}
                        img={roomInfo.black.img}
                    />
                    <button
                        className="btn btn-outline btn-error"
                        onClick={() => {
                            leaveRoomHandler(mode);
                        }}
                    >
                        Leave game
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default GameLayout;
