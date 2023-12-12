import { useAppDispatch } from "../store/hooks";
import axios from "../services/axios";
import { setCredentials } from "../store/authSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    await dispatch(setCredentials(response.data.accessToken));
    const user = JSON.parse(window.localStorage.getItem("ematija-user")!);
    const userWithNewAccessToken = {
      ...user,
      accessToken: response.data.accessToken,
    };
    window.localStorage.setItem(
      "ematija-user",
      JSON.stringify(userWithNewAccessToken)!
    );
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
