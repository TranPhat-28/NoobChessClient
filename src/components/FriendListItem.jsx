import PropTypes from "prop-types";
import { MdCircle, MdPersonRemove } from "react-icons/md";

const FriendListItem = ({ name }) => {
    return (
        <div className="bg-base-100 text-lg rounded p-2 hover:bg-base-300 cursor-pointer duration-75 flex group">
            <div className="flex-grow-[2]">
                <h2>{name}</h2>
                <div className="flex gap-2">
                    <MdCircle />
                    <p className="text-xs">Online</p>
                </div>
            </div>
            <button className="btn btn-outline btn-sm h-full btn-error hidden group-hover:block">
                <MdPersonRemove size={"2em"} />
            </button>
        </div>
    );
};

FriendListItem.propTypes = {
    name: PropTypes.string.isRequired,
};

export default FriendListItem;
