import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useGamePlayersSetup = () => {
    const navigate = useNavigate();

    const [roomInfo, setRoomInfo] = useState({
        roomTitle: "Loading",
        white: {
            name: "Loading",
            value: "Loading",
            description: "Loading",
            img: "Loading",
        },
        black: {
            name: "Loading",
            value: "Loading",
            description: "Loading",
            img: "Loading",
        },
    })

    const PlayerInformationSetup = (mode) => {
        switch (mode) {
            case "guess":
                setRoomInfo({
                    roomTitle: "GUESSMODE",
                    white: {
                        name: "Guess player",
                        value: "N/A",
                        description: "Win rate accumulated",
                        img: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
                    },
                    black: {
                        name: "Stockfish AI",
                        value: "Newbie",
                        description: "Difficulty",
                        img: "https://t3.ftcdn.net/jpg/01/36/49/90/360_F_136499077_xp7bSQB4Dx13ktQp0OYJ5ricWXhiFtD2.jpg",
                    },
                })
                break;
            case "singleplayer":
                console.log("SINGLEPLAYER")
                break;
            case "multiplayer":
                console.log("MULTIPLAYER")
                break;
            default:
                // Invalid url, go home
                navigate("/");
        }
    }

    return { roomInfo, PlayerInformationSetup }
}

export default useGamePlayersSetup;