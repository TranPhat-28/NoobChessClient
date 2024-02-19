import PropTypes from "prop-types";

const InGameProfile = ({ isBlack, name, value, description, img }) => {
    return (
        <div
            className={`stats shadow w-full ${
                isBlack ? "bg-gray-800 text-white" : ""
            }`}
        >
            <div className="stat">
                <div
                    className={`stat-title font-bold text-lg ${
                        isBlack ? "text-white" : ""
                    }`}
                >
                    {name}
                </div>
                <div className="stat-value">{value}</div>
                <div className={`stat-desc ${isBlack ? "text-white" : ""}`}>
                    {description}
                </div>
                <div className="stat-figure text-secondary">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <img src={img} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

InGameProfile.propTypes = {
    isBlack: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

export default InGameProfile;
