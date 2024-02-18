import { useDispatch } from "react-redux";
import { addUserAuth, removeUserAuth } from "../redux/features/auth/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCustomAuth = () => {

    // Redux
    const dispatch = useDispatch();

    // Loading state
    const [googleLoading, setGoogleLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false);

    // Custom Google OAuth login
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setGoogleLoading(true);
            try {
                // Send the token to the backend to verify and wait for a response JWT
                const backend_response = await axios.post("/api/Login/Google", {
                    googleAccessToken: tokenResponse.access_token,
                });

                // Set the Redux
                dispatch(addUserAuth(backend_response.data.data));
                localStorage.setItem(
                    "NoobChessClientUser",
                    JSON.stringify(backend_response.data.data)
                );

                toast.success(backend_response.data.message);
            } catch (err) {
                // console.log(err);
                toast.error("Error logging in with Google");
            } finally {
                setGoogleLoading(false);
            }
        },
        onError: () => {
            setGoogleLoading(false);
            toast.error("Google login failed");
            // Handle login errors here
        },
    });

    // Custom Facebook OAuth login
    const facebookLogin = async (response) => {
        setFacebookLoading(true);
        try {
            // Send the token to the backend to verify and wait for a response JWT
            const backend_response = await axios.post("/api/Login/Facebook", {
                facebookAccessToken: response.accessToken,
            });

            // Set the Redux
            dispatch(addUserAuth(backend_response.data.data));
            localStorage.setItem(
                "NoobChessClientUser",
                JSON.stringify(backend_response.data.data)
            );

            toast.success(backend_response.data.message);
        } catch (err) {
            // console.log(err);
            toast.error("Error logging in with Facebook");
        } finally {
            setFacebookLoading(false);
        }
    };

    // Logout hook
    const logout = () => {
        dispatch(removeUserAuth());
        localStorage.removeItem("NoobChessClientUser");
    }

    return { googleLogin, googleLoading, facebookLogin, facebookLoading, logout };
}

export default useCustomAuth;