import axios from "axios";
import { Chess } from "chess.js";
import { useState } from "react";
import { toast } from "react-toastify";

const useGuessModeGameHandler = () => {
    // The game
    const [game, setGame] = useState(new Chess("8/1q2P1k1/8/5K2/8/8/5B2/8 b - - 0 1"));

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
        // const possibleMoves = game.moves();

        // exit if the game is over
        // if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
        //     return;
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