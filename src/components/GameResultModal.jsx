import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const GameResultModal = ({ isVictory, wonSide, endgameType }) => {
    const navigate = useNavigate();

    return (
        <dialog id="gameResultModal" className="modal">
            <div className="modal-box flex flex-col items-center">
                <img src={isVictory === true ? "Victory.png" : "Defeat.png"} />
                <p className="font-bold text-2xl p-2">
                    {wonSide} won with a a {endgameType}.
                </p>

                <div className="my-2">
                    <p className="text-lg">Reward</p>
                    <div className="flex gap-1">
                        <p className="text-md sm:text-xl font-bold text-base">
                            200
                        </p>
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/lobby")}
                >
                    OK
                </button>
            </div>
        </dialog>
    );
};

GameResultModal.propTypes = {
    isVictory: PropTypes.bool.isRequired,
    wonSide: PropTypes.string.isRequired,
    endgameType: PropTypes.string.isRequired,
};

export default GameResultModal;
