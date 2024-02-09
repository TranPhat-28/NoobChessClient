import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/Users";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Settings = () => {
    // User
    const user = useSelector((state) => state.userAuth.user);

    // Hook
    const { logout } = useLogout();
    const navigate = useNavigate();

    // Logout function
    const logoutHandler = () => {
        logout();
        toast.success("Logout success");
        navigate("/");
    };

    console.log(user)

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            {user && (
                <div className="avatar mb-4">
                    <div className="w-40 sm:w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.picture} />
                    </div>
                </div>
            )}

            {user && (
                <div className="text-center">
                    <h1 className="font-bold text-3xl">{user.name}</h1>

                    <div className="overflow-x-auto my-4">
                        <table className="table table-sm lg:table-md">
                            <tbody>
                                <tr className="hover">
                                    <th>Member since:</th>
                                    <td>{user.dateJoined}</td>
                                </tr>

                                <tr className="hover">
                                    <th>Nation:</th>
                                    <td>{user.locale}</td>
                                </tr>

                                <tr className="hover">
                                    <th>Game played:</th>
                                    <td>00</td>
                                </tr>

                                <tr className="hover">
                                    <th>Victories:</th>
                                    <td>00</td>
                                </tr>

                                <tr className="hover">
                                    <th>Winning percentage:</th>
                                    <td>00 %</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <button
                        className="btn btn-outline btn-primary"
                        onClick={() => logoutHandler()}
                    >
                        Logout
                    </button>
                </div>
            )}

            {!user && (
                <div>
                    <h1 className="font-bold text-center text-2xl">
                        You are not logged in
                    </h1>
                    <p className="text-center">Go to Homepage to login now</p>

                    <button
                        className="btn btn-primary btn-outline w-full mt-5"
                        onClick={() => navigate("/")}
                    >
                        Go home
                    </button>
                </div>
            )}
        </div>
    );
};

export default Settings;
