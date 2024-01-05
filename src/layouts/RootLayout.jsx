import { Outlet } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar";

const RootLayout = () => {
    return (
        <div className="h-full w-full bg-base-300 flex flex-col-reverse lg:flex-row">
            <CustomNavbar />

            <Outlet />
        </div>
    );
};

export default RootLayout;