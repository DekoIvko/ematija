import { useUserAuthContext } from "../context/UserAuthContext";
import { AuthRefreshService } from "../services/AuthService";

const useRefreshToken = () => {
  const authUser = useUserAuthContext();

  const refresh = async () => {
    const response = await AuthRefreshService();
    await authUser.setUser(response.data);
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
