import PropTypes from "prop-types";

const MoveHistory = ({ whiteHistory, blackHistory }) => {
    return (
        <table className="table">
            <tbody>
                {/* Row no based on White because White always moves first */}
                {whiteHistory.map((item, index) => (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <td className="bg-white font-bold text-black text-center">
                            {item}
                        </td>
                        {blackHistory && (
                            <td className="bg-gray-800 font-bold text-white text-center">
                                {blackHistory[index]}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

MoveHistory.propTypes = {
    whiteHistory: PropTypes.array.isRequired,
    blackHistory: PropTypes.array.isRequired,
};

export default MoveHistory;
