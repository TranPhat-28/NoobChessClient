import axios from "axios";
import { Chess } from "chess.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useGuessModeGameHandler = () => {
    // Navigate
    const navigate = useNavigate();
    // The game
    const [game, setGame] = useState(new Chess("r3k2r/pp4bp/6p1/2PpK3/1n3P1q/7P/PPP5/RNB3NQ w - - 0 1"));
    // const [game, setGame] = useState(new Chess("8/8/8/8/k1Q5/2K5/8/8 w - - 0 1"));

    // Highlighting the squares
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState(null);

    // Promotion dialog
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [optionSquares, setOptionSquares] = useState({});

    // MoveHistory
    const [whiteHistory, setWhiteHistory] = useState([]);
    const [blackHistory, setBlackHistory] = useState([]);

    // Endgame info
    // const endgameInfo = {
    //     wonSide: "",
    //     endgameType: ""
    // }

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
                navigate("/hobby");
                console.log(aiMoveResponse.data.message);
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

                // Then show the dialog
                // endgameInfo.wonSide = aiMoveResponse.data.data.wonSide;
                // endgameInfo.endgameType = aiMoveResponse.data.data.endgameType;

                // console.log(endgameInfo);
                // document.getElementById("gameResultModal").showModal();
                // console.log(endgameInfo);
            }
            else {
                const gameCopy = game;
                const move = gameCopy.move({
                    from: aiMoveResponse.data.data.from,
                    to: aiMoveResponse.data.data.to,
                    promotion: aiMoveResponse.data.data.promotion,
                });

                // console.log(`Black ${move.from}${move.to}`)
                setBlackHistory([...blackHistory, `${move.from}${move.to}`])

                setGame(gameCopy);
                setMoveFrom("");
                setMoveTo(null);
                setOptionSquares({});
            }
        } catch (err) {

            console.log(err);
            toast.error("Something went wrong");
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