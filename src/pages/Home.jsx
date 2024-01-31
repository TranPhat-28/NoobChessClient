import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { PiRobotBold, PiHandFistBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUserAuth } from "../redux/features/auth/authSlice";
import animation from "../assets/animation.gif";

const Home = () => {
    // Redux
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userAuth.user);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Send the token to the backend to verify and wait for a response JWT
                const response = await axios.post("/api/Login/Google", {
                    googleAccessToken: tokenResponse.access_token,
                });

                // Set the Redux
                dispatch(addUserAuth(response.data.data));
                localStorage.setItem(
                    "NoobChessClientUser",
                    JSON.stringify(response.data.data)
                );

                toast.success(response.data.message);
            } catch (err) {
                // console.log(err);
                toast.error("Error logging in with Google");
            }
        },
        onError: () => {
            toast.error("Google login failed");
            // Handle login errors here
        },
    });

    return (
        <div className="h-full w-full pt-10">
            <h1 className="font-display text-2xl text-center sm:text-3xl md:text-4xl mb-0">
                {user ? `Welcome back ${user.name}` : "Welcome to Noob Chess"}
            </h1>
            <p className="text-center px-14">
                Practice your chess skill or play with friends right away
            </p>

            {!user && <img src="icon192.png" className="mx-auto p-4 h-44" />}

            {!user && (
                <div className="divider text-lg px-10 sm:px-24 md:px-32">
                    Login to save your progress
                </div>
            )}

            {user && <img src={animation} className="mx-auto p-4 h-80" />}

            {!user && (
                <div className="flex gap-2 justify-center pb-6">
                    <button
                        className="btn btn-outline hover:border-red-600 hover:bg-red-600"
                        onClick={() => googleLogin()}
                    >
                        <FaGoogle />
                        Google
                    </button>

                    <button className="btn btn-outline hover:border-blue-600 hover:bg-blue-600">
                        <FaFacebookF />
                        Facebook
                    </button>
                </div>
            )}

            <h2 className="text-2xl text-center">Start a game now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                <button className="btn text-lg h-full sm:p-6">
                    <div className="flex items-center gap-4">
                        <PiRobotBold className="text-6xl" />
                        <p>Play against AI bot</p>
                    </div>
                </button>
                <button className="btn text-lg h-full sm:p-6">
                    <div className="flex items-center gap-4">
                        <PiHandFistBold className="text-6xl" />
                        <p>Random multiplayer</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Home;
