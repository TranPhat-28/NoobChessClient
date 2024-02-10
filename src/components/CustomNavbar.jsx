import {
    PiUsersBold,
    PiGearSixBold,
    PiHouseBold,
    PiNewspaperClippingBold,
    PiShareNetworkBold,
} from "react-icons/pi";
import ResponsiveNavLink from "./ResponsiveNavLink";

const CustomNavbar = () => {
    return (
        <div className="bg-base-200 flex justify-center lg:flex-col lg:justify-start p-1 gap-1 lg:p-2">
            <img className="hidden lg:block max-w-xs" src="logo.png" />

            <ResponsiveNavLink
                icon={<PiHouseBold className="text-4xl md:text-5xl" />}
                text={"Home"}
                link={"/"}
            />
            <ResponsiveNavLink
                icon={<PiShareNetworkBold className="text-4xl md:text-5xl" />}
                text={"Social"}
                link={"/social"}
            />
            <ResponsiveNavLink
                icon={<PiNewspaperClippingBold className="text-4xl md:text-5xl" />}
                text={"News"}
                link={"/news"}
            />
            <ResponsiveNavLink
                icon={<PiUsersBold className="text-4xl md:text-5xl" />}
                text={"Friends"}
                link={"/friends"}
            />
            <ResponsiveNavLink
                icon={<PiGearSixBold className="text-4xl md:text-5xl" />}
                text={"Settings"}
                link={"/settings"}
            />
        </div>
    );
};

export default CustomNavbar;

//<div className="bg-base-200 flex lg:flex-col justify-between sm:justify-center sm:gap-20 [&_.active]:bg-base-300">
