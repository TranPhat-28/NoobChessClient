import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const GameResultModal = ({ isVictory, wonSide, endgameType }) => {
    const navigate = useNavigate();

    return (
        <dialog id="gameResultModal" className="modal">
            <div className="modal-box flex flex-col items-center">
                <img
                    src={isVictory === true ? "/Victory.png" : "/Defeat.png"}
                />
                <p className="font-bold text-2xl p-2">
                    {wonSide} won with a {endgameType}.
                </p>

                <div className="flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/lobby")}
                    >
                        OK
                    </button>

                    <button
                        className="btn btn-primary btn-outline"
                        onClick={() =>
                            document.getElementById("gameResultModal").close()
                        }
                    >
                        See board
                    </button>
                </div>
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
