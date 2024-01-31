import { useDispatch } from "react-redux";
import { removeUserAuth } from "../redux/features/auth/authSlice";

const useLogout = () => {

    const dispatch = useDispatch();

    const logout = () => {
        // Remove User
        dispatch(removeUserAuth());
        localStorage.removeItem("NoobChessClientUser");
    }

    return { logout };
}

export default useLogout;