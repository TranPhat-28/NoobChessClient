import PropTypes from "prop-types";

const GameRoomListItem = ({ name }) => {
    return (
        <div className="bg-base-100 text-lg rounded p-2 hover:bg-base-300 cursor-pointer duration-75 flex group">
            <div className="flex-grow-[2]">
                <h2>{name}</h2>
                <p className="text-xs">Host by</p>
            </div>
            <p className="flex-grow h-fit self-center text-center hidden group-hover:block">Click to join</p>
        </div>
    );
};

GameRoomListItem.propTypes = {
    name: PropTypes.string.isRequired,
};

export default GameRoomListItem;
