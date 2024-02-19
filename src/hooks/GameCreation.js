import { useNavigate } from "react-router-dom";

const useGameCreation = () => {

    const navigate = useNavigate();

    const CreateSinglePlayerGameNoAuth = () => {
        navigate("/game/guess");
    }

    const CreateSinglePlayerGameAuth = () => {
        console.log("SP");
    }

    const CreateMultiPlayerGame = () => {
        console.log("Create MultiPlayer Game");
    }

    return { CreateSinglePlayerGameAuth, CreateSinglePlayerGameNoAuth, CreateMultiPlayerGame };
}

export default useGameCreation;