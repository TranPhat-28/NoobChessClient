import PropTypes from "prop-types";

const ResponsiveNavLink = (props) => {
    const { icon, text } = props;

    return (
        <button className="btn btn-square btn-lg bg-base-100 lg:rounded-xl md:w-[4.5rem] md:h-[4.5rem] lg:h-14 lg:w-full lg:flex lg:justify-start lg:px-2">
            {icon}
            <p className="hidden lg:block">{text}</p>
        </button>
    );
};

ResponsiveNavLink.propTypes = {
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
};

export default ResponsiveNavLink;
