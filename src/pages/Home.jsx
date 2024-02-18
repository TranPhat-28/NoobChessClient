import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { TbChessQueenFilled, TbNews } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import animation from "../assets/animation.gif";
import useCustomAuth from "../hooks/CustomAuth";

const Home = () => {
    // Navigate
    const navigate = useNavigate();

    // Redux
    const user = useSelector((state) => state.userAuth.user);

    // Custom hook
    const { googleLogin, googleLoading, facebookLogin, facebookLoading } =
        useCustomAuth();

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
                        className={`btn ${
                            googleLoading ? "btn-disabled" : "btn-outline"
                        } hover:border-red-600 hover:bg-red-600`}
                        onClick={googleLogin}
                    >
                        {googleLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <FaGoogle />
                        )}
                        Google
                    </button>

                    <FacebookLogin
                        appId="1371810450190886"
                        callback={facebookLogin}
                        render={(renderProps) => (
                            <button
                                className={`btn ${
                                    facebookLoading
                                        ? "btn-disabled"
                                        : "btn-outline"
                                } hover:border-blue-600 hover:bg-blue-600`}
                                onClick={renderProps.onClick}
                            >
                                {facebookLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <FaFacebookF />
                                )}
                                Facebook
                            </button>
                        )}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-2">
                <button
                    className="btn text-lg h-full sm:p-6"
                    onClick={() => navigate("/lobby")}
                >
                    <div className="flex items-center gap-4">
                        <TbChessQueenFilled className="text-6xl" />
                        <p>Start playing now</p>
                    </div>
                </button>
                <button
                    className="btn text-lg h-full sm:p-6"
                    onClick={() => navigate("/news")}
                >
                    <div className="flex items-center gap-4">
                        <TbNews className="text-6xl" />
                        <p>Visit some articles</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Home;
