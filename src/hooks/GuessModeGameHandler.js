import axios from "axios";
import { Chess } from "chess.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEndgameInfo } from "../redux/features/endgameInfo/endgameInfoSlice";
import { setGlobalModal } from "../redux/features/globalModal/globalModalSlice";

const useGuessModeGameHandler = () => {
    // Navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // The game
    const [game, setGame] = useState(new Chess());

    // Highlighting the squares
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState(null);

    // Promotion dialog
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [optionSquares, setOptionSquares] = useState({});

    // MoveHistory
    const [whiteHistory, setWhiteHistory] = useState([]);
    const [blackHistory, setBlackHistory] = useState([]);

    function getMoveOptions(square) {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares = {};
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                        game.get(move.to).color !== game.get(square).color
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            };
            return move;
        });
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
        return true;
    }

    async function fetchAiResponseMove() {
        try {
            const aiMoveResponse = await toast.promise(
                axios.post("/api/Singleplayer/Guess", {
                    guessModeInputFEN: game.fen(),
                }),
                {
                    pending: 'AI is thinking...',
                    error: 'Something went wrong'
                }
            );

            // Some error happened
            if (!aiMoveResponse.data.isSuccess) {
                dispatch(setGlobalModal({ title: "Error", description: aiMoveResponse.data.message, img: "/Error.png" }))
                navigate("/lobby");
                document.getElementById("globalModal").showModal();
            }
            // If gameover
            else if (aiMoveResponse.data.data.isGameOver) {
                // Make the move (if Black won)
                if (aiMoveResponse.data.data.wonSide === "Black") {
                    const gameCopy = game;
                    const move = gameCopy.move({
                        from: aiMoveResponse.data.data.from,
                        to: aiMoveResponse.data.data.to,
                        promotion: aiMoveResponse.data.data.promotion,
                    });
                    setBlackHistory([...blackHistory, `${move.from}${move.to}`])
                }

                dispatch(addEndgameInfo({ wonSide: aiMoveResponse.data.data.wonSide, endgameType: aiMoveResponse.data.data.endgameType }))

                // Then show the dialog
                document.getElementById("gameResultModal").showModal();
            }
            else {
                const gameCopy = game;
                const move = gameCopy.move({
                    from: aiMoveResponse.data.data.from,
                    to: aiMoveResponse.data.data.to,
                    promotion: aiMoveResponse.data.data.promotion,
                });

                setBlackHistory([...blackHistory, `${move.from}${move.to}`])

                setGame(gameCopy);
                setMoveFrom("");
                setMoveTo(null);
                setOptionSquares({});
            }
        } catch (err) {

            // console.log(err);
            // toast.error("Something went wrong");
            dispatch(setGlobalModal({ title: "Error", description: "Server encountered a problem and the game was exterminated.", img: "/Error.png" }))
            navigate("/lobby");
            document.getElementById("globalModal").showModal();
        }
    }

    function onSquareClick(square) {
        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        // to square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = game.moves({
                moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square
            );
            // not a valid move
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : "");
                return;
            }

            // valid move
            setMoveTo(square);

            // if promotion move
            if (
                (foundMove.color === "w" &&
                    foundMove.piece === "p" &&
                    square[1] === "8") ||
                (foundMove.color === "b" &&
                    foundMove.piece === "p" &&
                    square[1] === "1")
            ) {
                setShowPromotionDialog(true);
                return;
            }

            // is normal move
            const gameCopy = game;
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: "q",
            });

            // console.log(`White ${move.from}${move.to}`)
            setWhiteHistory([...whiteHistory, `${move.from}${move.to}`])

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            setGame(gameCopy);

            fetchAiResponseMove();
            setMoveFrom("");
            setMoveTo(null);
            setOptionSquares({});
            return;
        }
    }

    function onPromotionPieceSelect(piece) {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece) {
            const gameCopy = game;
            const move = gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q",
            });

            // console.log(`White ${move.from}${move.to}`)
            setWhiteHistory([...whiteHistory, `${move.from}${move.to}`])

            setGame(gameCopy);
            fetchAiResponseMove();
        }

        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        return true;
    }

    return { game, onSquareClick, optionSquares, showPromotionDialog, onPromotionPieceSelect, moveTo, whiteHistory, blackHistory };
}

export default useGuessModeGameHandler;