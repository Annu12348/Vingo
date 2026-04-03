import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducer/AuthenticationSlice";
import { setShop } from "../redux/reducer/ShopReducer";
import { setItem } from "../redux/reducer/ItemReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/auth";
import { persistor } from "../redux/store";

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await logoutApi();
            dispatch(setUser(null));
            dispatch(setShop([]));
            dispatch(setItem([]));
            persistor.purge();
            toast.success("Successfully logged out user");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error("Failed to log out. Please try again.");
        }
    };

    return { logout };
};