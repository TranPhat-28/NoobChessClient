import {
    PiUsersBold,
    PiGearSixBold,
    PiHouseBold,
    PiTrophyBold,
    PiNewspaperClippingBold,
} from "react-icons/pi";
import { NavLink } from "react-router-dom";
import ResponsiveNavLink from "./ResponsiveNavLink";

const CustomNavbar = () => {
    return (
        <div className="bg-base-200 flex justify-center lg:flex-col lg:justify-start p-1 gap-1 lg:p-2">
            <img className="hidden lg:block max-w-xs" src="logo.png" />

            <ResponsiveNavLink
                icon={<PiHouseBold className="text-4xl md:text-5xl" />}
                text={"Home"}
            />
            <ResponsiveNavLink
                icon={<PiTrophyBold className="text-4xl md:text-5xl" />}
                text={"Leaderboard"}
            />
            <ResponsiveNavLink
                icon={<PiNewspaperClippingBold className="text-4xl md:text-5xl" />}
                text={"News"}
            />
            <ResponsiveNavLink
                icon={<PiUsersBold className="text-4xl md:text-5xl" />}
                text={"Friends"}
            />
            <ResponsiveNavLink
                icon={<PiGearSixBold className="text-4xl md:text-5xl" />}
                text={"Settings"}
            />
        </div>
    );
};

export default CustomNavbar;

//<div className="bg-base-200 flex lg:flex-col justify-between sm:justify-center sm:gap-20 [&_.active]:bg-base-300">
