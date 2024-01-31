import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ResponsiveNavLink = (props) => {
    const { icon, text, link } = props;

    const navigate = useNavigate();

    return (
        <button
            className="btn btn-square btn-lg bg-base-100 lg:rounded-xl md:w-[4.5rem] md:h-[4.5rem] lg:h-14 lg:w-full lg:flex lg:justify-start lg:px-2"
            onClick={() => navigate(link)}
        >
            {icon}
            <p className="hidden lg:block">{text}</p>
        </button>
    );
};

ResponsiveNavLink.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default ResponsiveNavLink;
